export default {
  methods: {
    numberEnding(date) {
      if (!date) {
        return;
      }
      const last = date.toString().slice(-1);
      if (last == "1") {
        return "st";
      } else if (last == "2") {
        return "nd";
      } else if (last == "3") {
        return "rd";
      } else {
        return "th";
      }
    },
  },
};
