const express = require("express");
const app = express();
const port = 9000;

const http = require("http");
const server = http.createServer(app);

app.get("/api", (req, res) => {
  const slackName = req.query.slack_name;
  const trackName = req.query.track;
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const time = new Date();
  const day = time.getDay();
  time.setMilliseconds("");

  const response = {
    slack_name: slackName,
    current_day: week[day],
    utc_time: time.toISOString().slice(0, -5) + "Z",
    track: trackName,
    github_file_url:
      "https://github.com/danielopara/hngx_project/blob/master/index.js",
    github_repo_url: "https://github.com/danielopara/hngx_project",
    status_code: 200,
  };

  try {
    res.status(200).json(response);
  } catch (err) {
    console.log(err, "Error");
    res.status(400).json({
      message: "page not found",
    });
  }
});

server.listen(port, () => {
  console.log("listening on port " + port);
});
