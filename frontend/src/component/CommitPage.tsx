import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Commit = {
  sha: string;
  author: string;
  message: string;
  commit_date: string;
};

const CommitPage = () => {
  const { name } = useParams();
  const [commits, setCommits] = useState<Commit[]>([]);

  const getCommits = useCallback(async () => {
    if (name) {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/freeCodeCamp/${name}/commits`
        );
        const list = res.data.map((item: any) => ({
          sha: item.sha,
          author: item.commit.author.name,
          message: item.commit.message,
          commit_date: item.commit.author.date,
        }));
        setCommits(list);
      } catch (error) {
        console.log(error);
        setCommits([]);
      }
    }
  }, [name]);

  useEffect(() => {
    getCommits();
  }, [getCommits]);

  return (
    <div>
      <button
        style={{
          margin: "10px",
        }}
      >
        <Link to={"/"}>Back</Link>
      </button>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Commits
      </h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Author</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {commits.map((commit: Commit) => (
            <tr key={commit.sha}>
              <td>{commit.commit_date}</td>
              <td>{commit.author}</td>
              <td>{commit.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitPage;
