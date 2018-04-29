import axios from 'axios';

const myMeetingsURL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events'

class Dashboard {
  static async getMyMeetings() {
    try {
      const response = await axios.get(myMeetingsURL);
      return response.data.items;
    } catch (error) {
      throw error;
    }
  }
}

export default Dashboard;
