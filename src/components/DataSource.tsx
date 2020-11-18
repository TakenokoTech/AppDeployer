/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

import moment from "moment";
import { ArtifactItem, getArtifact, getPullRequest, getWorkflow, searchRepositories, WorkflowItem } from "./GithubRepository";

export interface Description {
  repository: string;
  branch: string;
  commit: string;
  log: string;
}

export interface HistoryItem {
  date: string;
  branch: string;
  commit: string;
  comment: string;
}

export interface AppInfo {
  logoImg: string;
  packageName: string;
  appName: string;
  uploadDate: string;
  artifact: { name: string; url: string }[];
  text: Description;
  link: Description;
  history: HistoryItem[];
}

export const initAppInfo: AppInfo = {
  logoImg: "",
  packageName: "",
  appName: "",
  uploadDate: "",
  artifact: [],
  text: {
    repository: "",
    branch: "",
    commit: "",
    log: "",
  },
  link: {
    repository: "",
    branch: "",
    commit: "",
    log: "",
  },
  history: [],
};

const mockData: AppInfo = {
  logoImg: "apricot_img.png",
  packageName: "tach.takenoko.sampleapp",
  appName: "SampleApp",
  uploadDate: "2020/01/01 11:22",
  artifact: [
    {
      name: "app1",
      url: "app1",
    },
    {
      name: "app2",
      url: "app2",
    },
  ],
  text: {
    repository: "Repository",
    branch: "master",
    commit: "3d1c536b90235a5....",
    log: "PR-1:build",
  },
  link: {
    repository: "https://www.google.com/",
    branch: "https://www.google.com/",
    commit: "https://www.google.com/",
    log: "https://www.google.com/",
  },
  history: [
    {
      date: "2020/01/01 11:22",
      branch: "branch1",
      commit: "#234la2",
      comment: "commit comment 1",
    },
    {
      date: "2020/01/02 11:22",
      branch: "branch2",
      commit: "#ab34rf",
      comment: "commit comment 2",
    },
    {
      date: "2020/01/03 11:22",
      branch: "branch3",
      commit: "#asda34k",
      comment: "commit comment 3",
    },
  ],
};

async function getAppInfo(repoName: string, commit = null): Promise<AppInfo> {
  const list = await getWorkflow(repoName);

  if (list.length < 1) {
    return initAppInfo;
  }

  if (!commit) {
    commit = list[0].head_commit.id;
  }

  list.sort((a, b) => (moment(a.updated_at).unix() < moment(b.updated_at).unix() ? 1 : -1));
  const workflow = list.find((it) => it.head_commit.id === commit) || list[0];
  const promise = list.filter((it) => it.head_commit.id === commit).map((it) => getArtifact(it));
  const artifacts = (await Promise.all(promise)).flatMap((it) => it).filter((v) => !!v);

  return {
    logoImg: "apricot_img.png",
    packageName: workflow.repository.full_name,
    appName: workflow.repository.name,
    uploadDate: workflow.updated_at.replace(/[A-Z]/g, " "),
    text: {
      repository: workflow.repository.full_name,
      branch: workflow.head_branch,
      commit: workflow.head_commit.id,
      log: `${workflow.id}`,
    },
    artifact: artifacts.map((it) => ({
      name: it.name,
      url: it.archive_download_url,
    })),
    link: {
      repository: `https://github.com/${workflow.repository.full_name}`,
      branch: `https://github.com/TakenokoTech/FlutterArchitecture/tree/${workflow.head_branch}`,
      commit: `https://github.com/TakenokoTech/FlutterArchitecture/commit/${workflow.head_commit.id}`,
      log: `https://github.com/${workflow.repository.full_name}/actions/runs/${workflow.id}`,
    },
    history: list.map((it) => ({
      date: it.updated_at.replace(/[A-Z]/g, " "),
      branch: it.head_branch,
      commit: it.head_commit.id,
      comment: it.head_commit.message,
    })),
  };
}

export function getToken(): string | null {
  const token = sessionStorage.getItem("token");
  // console.log(`token: ${token}`);
  return token;
}

export function getUser(): string | null {
  const user = sessionStorage.getItem("user");
  // console.log(`user: ${user}`);
  return user;
}

export function getRepos(): string | null {
  const repos = sessionStorage.getItem("repos");
  // console.log(`repos: ${repos}`);
  return repos;
}

export function lastRepo(): string | null {
  const repo = sessionStorage.getItem("lastRepo");
  // console.log(`lastRepo: ${repo}`);
  return repo;
}

export default {
  getAppInfo,
  initAppInfo,
};
