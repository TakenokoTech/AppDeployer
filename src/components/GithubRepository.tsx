import queryString from "query-string";

export default {};

export async function searchRepositories(_searchWord: string): Promise<any> {
  const searchWord = "TakenokoTech/UniTool";

  const query = queryString.stringify(
    {
      q: searchWord,
      sort: "stars",
      order: "desc",
    },
  );

  const resp = await fetch(`https://api.github.com/search/repositories?${query}`);
  const json = await resp.json();

  // console.log(json.items[0].full_name);
  // console.log(json.items[0].html_url);

  return [];
}

/*
export async function getCommits(): Promise<any> {
  const resp = await fetch("https://api.github.com/repos/TakenokoTech/FlutterArchitecture/commits");
  const json = await resp.json();
  console.log(json);
}

export async function getArtifactory(): Promise<any> {
  const resp = await fetch("https://api.github.com/repos/TakenokoTech/FlutterArchitecture/actions/artifacts");
  const json = await resp.json();
  console.log(json);
}
*/

export async function getWorkflow(): Promise<WorkflowItem[]> {
  const url = "https://api.github.com/repos/TakenokoTech/FlutterArchitecture/actions/runs";
  const resp2 = await fetch(url);
  const json2 = await resp2.json();

  const workflows = [0, 1, 2].map((index) => {
    const workflow: WorkflowItem = json2.workflow_runs[index];
    console.log(`>>>>> ${url}`);
    console.log(workflow);
    console.log("");
    return workflow;
  });

  return workflows;
}

export async function getArtifact(workflow: WorkflowItem): Promise<ArtifactItem> {
  const url = workflow.artifacts_url;

  const resp = await fetch(url);
  const json = await resp.json();

  const artifact: ArtifactItem = json.artifacts[0];
  console.log(`>>>>> ${url}`);
  console.log(artifact);
  console.log("");

  return artifact;
}

export async function getPullRequest(workflow: WorkflowItem): Promise<any> {
  if (workflow.pull_requests.length < 1) return {};
  const { url } = workflow.pull_requests[0];

  const resp = await fetch(url);
  const json = await resp.json();

  console.log(`>>>>> ${url}`);
  console.log(json.html_url);
  console.log("");

  return json as PullRequestItem;
}

/* eslint-disable camelcase */
interface ArtifactItem {
  id: number,
  node_id: string,
  name: string,
  size_in_bytes: number,
  url: string,
  archive_download_url: string,
  expired: true,
  created_at: string,
  updated_at: string,
  expires_at: string
}

interface WorkflowItem {
  id: number,
  node_id: string,
  head_branch: string,
  head_sha: string,
  run_number: number,
  event: string,
  status: string,
  conclusion: string,
  workflow_id: number,
  check_suite_id: number,
  check_suite_node_id: string,
  url: string,
  html_url: string,
  pull_requests: { url: string, id: number }[]
  created_at: string,
  updated_at: string,
  artifacts_url: string,
}

interface PullRequestItem {
  url: string,
  id: number,
  node_id: string,
  html_url: string,
  diff_url: string,
  patch_url: string,
  issue_url: string,
  state: string,
  title: string
}
