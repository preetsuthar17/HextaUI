export const ShiningButton = () => {
  return (
    <>
      <button className="cursor-pointer font-medium px-4 py-[0.4rem] bg-gradient-to-b from-blue-500 via-blue-600 to-blue-800 overflow-hidden relative rounded-full before:absolute before:w-[0.4rem] before:h-[20rem] before:top-0  before:translate-x-[-8rem] hover:before:translate-x-[7rem] before:duration-[0.8s] before:-skew-x-[10deg]  before:transition-all before:bg-white before:blur-[8px] hover:brightness-100 flex items-center justify-center gap-2 transition-all brightness-90 group text-white">
        {" "}
        Ask AI
      </button>
    </>
  );
};
