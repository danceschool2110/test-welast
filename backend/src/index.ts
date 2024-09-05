import axios from "axios";
import express, { Response, Request } from "express";
import cors from "cors";

const app = express();
const port = 3001;

let corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.get("/repos", async (req: Request, res: Response) => {
  try {
    const repos = await axios.get(
      "https://api.github.com/users/freeCodeCamp/repos"
    );
    const results = repos.data.filter(
      (item: any) => !item.fork && item.forks > 5
    );
    return res.json({ data: results });
  } catch (error) {
    throw new Error("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
