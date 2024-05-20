// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      const { username, password } = req.body;


      if (username === 'admin' && password === 'admin') {
         const token = 'token_here';
         res.status(200).json({ token });
      } else {
         res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác' });
      }
   } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
