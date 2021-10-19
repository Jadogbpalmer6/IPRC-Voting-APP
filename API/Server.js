
route = require("./Routes/index")

app.use(route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server listenning..... at port ${PORT}`));

