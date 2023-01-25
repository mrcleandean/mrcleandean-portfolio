import BigLetter from "../components/BigLetter";
const bigT = ['Clean Dean'];
export default function Portfolio() {
  return (
    <div>
      <div className={`
         bg-blue-900 w-screen h-screen max-h-96 flex justify-center items-center flex-col
      `}>
        <div>
          <div>
            <h1 className="text-white font-bigT flex items-center h-10">
              {bigT.map((letter, i) => <BigLetter key={i} l={letter} />)}
            </h1>
          </div>
          <p className="mt-3 ml-2 text-indigo-400 font-mono">Web Developer</p>
        </div>
      </div>
    </div>
  );
}
