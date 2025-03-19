import { AppDataSource } from "../../data-source";
import { Board } from "../../entity/Board";
import { Users } from "../../entity/User";

export const getUserBoards = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await AppDataSource.getRepository(Users).findOne({
      where: { id: userId },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const boards = await AppDataSource.getRepository(Board).find({
      where: { user: { id: userId } },
      relations: ["columns"],
    });

    res.status(200).json(boards);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Interal server error" });
  }
};
