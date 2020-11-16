// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { clientId, clientSecret, redirectUri } from "../../components/Const";

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { code } = _req.query;

  const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  res.statusCode = response.status;
  res.json(await response.json());
};
