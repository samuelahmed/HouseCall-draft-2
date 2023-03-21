import Pusher from "pusher";

const pusherKey = new Pusher({
  appId: "1571069",
  key: "c13caf6d2e7e0e3addce",
  secret: "a157128c244e8950e7d3",
  cluster: "us3",
  useTLS: true
});

pusherKey.trigger("my-channel", "my-event", {
  message: "hello world"
});