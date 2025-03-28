import {PrismaClient} from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export const Login = async (req, res) => {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });
  
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
  
    const match = await argon2.verify(user.password, req.body.password);
  
    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }
  
    req.session.userId = user.id;
  
    const { id, nama, email, role } = user;
    res.status(200).json({ id, nama, email, role });
  };

  export const Me = async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda" });
    }

    const response = await prisma.users.findUnique({
        where: {
            id: Number(req.session.userId)
        },
        select: {
            id: true,
            nama: true,
            email: true,
            role: true
        }
    });

    if (!response) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(response);
};

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Anda telah berhasil logout" });
    });
};
