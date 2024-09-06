import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Repo = {
  id: string;
  name: string;
  description: string;
  language: string;
  forks_count: number;
  created_at: string;
};

function HomePage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const navigate = useNavigate();

  const filterRepos = useMemo(() => {
    return selectedLanguage === "All"
      ? repos
      : repos.filter((repo) => repo.language === selectedLanguage);
  }, [repos, selectedLanguage]);

  const getRepos = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3001/repos");
      const repoList: Repo[] = res.data.data;
      const languageList: string[] = ["All"];
      repoList.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setRepos(repoList);
      repoList.forEach((repo) => {
        if (repo.language && !languageList.includes(repo.language)) {
          languageList.push(repo.language);
        }
      });
      setLanguages(languageList);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const clickRepo = (repo: Repo) => {
    navigate(`/${repo.name}`);
  };

  const onChangeSelectLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  return (
    <div className="HomePage">
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Repos
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: "40px",
          marginBottom: "40px",
        }}
      >
        <select value={selectedLanguage} onChange={onChangeSelectLanguage}>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Language</th>
            <th>Forks Count</th>
          </tr>
        </thead>
        <tbody>
          {filterRepos.map((repo: Repo) => (
            <tr
              key={repo.id}
              onClick={() => clickRepo(repo)}
              style={{
                borderBottom: "1px solid black !important",
              }}
            >
              <td>{repo.name}</td>
              <td>{repo.description}</td>
              <td>{repo.language}</td>
              <td>{repo.forks_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
