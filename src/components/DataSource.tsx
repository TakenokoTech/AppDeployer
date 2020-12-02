/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

// import { Unzip } from "zlib";
import { resolve } from "path";
import moment from "moment";
import unzip from "zlibjs/bin/unzip.min.js";
import { getArtifact, getWorkflow } from "./GithubRepository";

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

const initAppInfo: AppInfo = {
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

export async function getZipFilenames(url: string): Promise<string[]> {
  return new Promise((res) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.send();

    xhr.addEventListener("load", () => {
      const { Zlib } = unzip;
      const unzipFile = new Zlib.Unzip(Buffer.from(xhr.response));
      const filenames = unzipFile.getFilenames();
      res(filenames);
    });
  });
}

export default {
  initAppInfo,
  getAppInfo,
};
