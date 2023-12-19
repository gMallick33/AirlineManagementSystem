const { BookingRepository } = require("../repository/index");
const { ServiceError } = require("../utils/errors/index");
const axios = require("axios");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;
      console.log(flightData);
      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrongin the booking process",
          "Insufficient seats in the airplane"
        );
      }

      const totalCost = priceOfTheFlight * data.noOfSeats;
      console.log("total cost is: ", totalCost);
      const userdata = await axios.get(
        `http://localhost:3001/api/v1/users/${data.userId}`
      );
      const userEmail = userdata.data.data.email;
      console.log(userEmail);
      const bookingPayload = { ...data, totalCost };
      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });
      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });

      const channel = await createChannel();
      const payload = {
        data: {
          subject: "This is a notification from queue",
          content: "some queue will subscribe this",
          recepientEmail: userEmail,
          notificationTime: "2023-01-01T09:51:00",
        },
        service: "CREATE_TICKET",
      };
      publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));

      return finalBooking;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
