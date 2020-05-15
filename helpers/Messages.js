const workoutMessage = (workout) => {
  const messageText = `Time to do ${workout.quantity} <${workout.link}|${workout.title}>`;

  const workoutCode = `${workout.id}|${workout.quantity}|${genRandomID()}`;
  
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: messageText,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Mark Complete",
            emoji: true,
          },
          value: `${workoutCode}`,
        },
      },
    ],
  };
};

const genRandomID = () => {
  return '_' + Math.random().toString(36).substr(2, 15)
}

module.exports = {
  workoutMessage
}