import { Plus } from "phosphor-react";
import logoImg from "../assets/logo.svg";

export const Header = () => {
  return (
    <div className="w-full  flex items-center justify-between ">
      <img src={logoImg} alt="" className="" />

      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300"
      >
        <Plus size={20} className="text-violet-500" />
        New habit
      </button>
    </div>
  );
};
