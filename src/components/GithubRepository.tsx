/* eslint-disable camelcase */

import queryString from "query-string";
import { clientId, redirectUri, oauthScope } from "./Const";
import { getToken, getRepos, getUser } from "./DataSource";

export default {};

/**
 * Get the authenticated user
 * @param code authenticated code
 *
 * https://docs.github.com/en/free-pro-team@latest/rest/reference/users#get-the-authenticated-user
 */
export async function initAccount(code: string): Promise<void> {
  if (getToken()) {
    return;
  }
  if (!code) {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${oauthScope}`;
    return;
  }
  const response = await fetch(`api/token?code=${code}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  const { access_token, scope, token_type } = await response.json();
  sessionStorage.setItem("token", access_token);
  // console.log(access_token, scope, token_type);

  const url = "https://api.github.com/user";
  const resp = await fetch(url, {
    headers: {
      Authorization: `token ${getToken()}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  const { login, repos_url } = await resp.json();
  sessionStorage.setItem("user", login);
  sessionStorage.setItem("repos", repos_url);
  // console.log(login);
}

/**
 * Lists repositories
 *
 * https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-organization-repositories
 */
export async function getRepositories(): Promise<RepoItem[]> {
  const resp = await fetch(`${getRepos()}?per_page=100`, {});
  const json = await resp.json();

  const repos =
    json.map((repo) => ({
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
    })) || [];
  // console.log(json);

  return repos;
}

/**
 * List workflow runs for a repository
 *
 * https://docs.github.com/en/free-pro-team@latest/rest/reference/actions#list-workflow-runs-for-a-repository
 */
export async function getWorkflow(repoName: string): Promise<WorkflowItem[]> {
  // UniTool
  // FlutterArchitecture
  const url = `https://api.github.com/repos/${getUser()}/${repoName}/actions/runs`;
  const resp2 = await fetch(url);
  const json2 = await resp2.json();

  const workflows = json2.workflow_runs?.map((workflow) => workflow) || [];
  // console.log(workflow.head_commit.id);
  // console.log(`>>>>> ${url}`);
  // console.log(workflow);
  // console.log("");

  return workflows;
}

/**
 * List artifacts for a repository
 * @param workflow workflow
 *
 * https://docs.github.com/en/free-pro-team@latest/rest/reference/actions#list-artifacts-for-a-repository
 */
export async function getArtifact(workflow: WorkflowItem): Promise<ArtifactItem[]> {
  const url = workflow.artifacts_url;

  const resp = await fetch(url);
  const json = await resp.json();

  const artifact: ArtifactItem[] = json.artifacts;
  // console.log(artifact?.length ?? 0);
  // console.log(`>>>>> ${url}`);
  // console.log(artifact);
  // console.log("");

  return artifact;
}

/**
 * List PullRequest for a repository
 * @param workflow workflow
 */
export async function getPullRequest(workflow: WorkflowItem): Promise<any> {
  if (workflow.pull_requests.length < 1) return {};
  const { url } = workflow.pull_requests[0];

  const resp = await fetch(url);
  const json = await resp.json();
  // console.log(`>>>>> ${url}`);
  // console.log(json.html_url);
  // console.log("");

  return json as PullRequestItem;
}

/* eslint-disable camelcase */
export interface ArtifactItem {
  id: number;
  node_id: string;
  name: string;
  size_in_bytes: number;
  url: string;
  archive_download_url: string;
  expired: true;
  created_at: string;
  updated_at: string;
  expires_at: string;
}

export interface WorkflowItem {
  id: number;
  node_id: string;
  head_branch: string;
  head_sha: string;
  run_number: number;
  event: string;
  status: string;
  conclusion: string;
  workflow_id: number;
  check_suite_id: number;
  check_suite_node_id: string;
  url: string;
  html_url: string;
  pull_requests: { url: string; id: number }[];
  created_at: string;
  updated_at: string;
  artifacts_url: string;
  repository: any;
  head_commit: any;
}

export interface RepoItem {
  name: string;
  full_name: string;
  html_url: string;
}

interface PullRequestItem {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  state: string;
  title: string;
}
