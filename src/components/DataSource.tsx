import {
  getArtifact, getPullRequest, getWorkflow, searchRepositories,
} from "./GithubRepository";

export interface Description {
  repository: string;
  branch: string;
  commit: string;
  log: string;
}

export interface HistoryItem {
  date: string;
  commit: string;
  comment: string;
}

export interface AppInfo {
  logoImg: string;
  packageName: string;
  appName: string;
  uploadDate: string;
  text: Description;
  link: Description;
  history: HistoryItem[];
}

async function getAppInfo(): Promise<AppInfo> {
  searchRepositories("");
  const wf = await getWorkflow();
  wf.forEach(async (it) => {
    await getArtifact(it);
    await getPullRequest(it);
  });

  return {
    logoImg: "apricot_img.png",
    packageName: "tach.takenoko.sampleapp",
    appName: "SampleApp",
    uploadDate: "2020/01/01 11:22",
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
        commit: "#234la2",
        comment: "commit comment 1",
      },
      {
        date: "2020/01/02 11:22",
        commit: "#ab34rf",
        comment: "commit comment 2",
      },
      {
        date: "2020/01/03 11:22",
        commit: "#asda34k",
        comment: "commit comment 3",
      },
    ],
  };
}

export const initAppInfo: AppInfo = {
  logoImg: "",
  packageName: "",
  appName: "",
  uploadDate: "",
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

export default {
  getAppInfo,
  initAppInfo,
};
