import { useCallback, useEffect, useRef, useState } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [allowNum, setAllowNum] = useState(false);
  const [allowSpecial, setAllowSpecial] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNum) char += "1234567890";
    if (allowSpecial) char += "`~!@#$%^&*";

    for (let index = 0; index < length; index++) {
      const element = Math.floor(Math.random() * char.length);
      pass += char[element];
    }
    setPassword(pass);
  }, [allowNum, allowSpecial, length]);

  useEffect(() => {
    generatePassword();
  }, [length, allowNum, allowSpecial]);

  const passRef = useRef(null);

  const copyPassword = useCallback(() => {
    passRef?.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <h1 className="font-bold text-5xl text-center pt-5 font-display text-[#E45A92] stroke-[#5D2F77] stroke-2">
        Password Generator
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center my-3 bg-[#E45A92] container max-w-3xl rounded-md">
          <div className="text-center py-2 w-full">
            <input
              ref={passRef}
              type="text"
              readOnly
              value={password}
              placeholder="password"
              className="bg-[#FFACAC] text-[#5D2F77] px-4 py-2 rounded-md w-full max-w-md text-center"
            />
            <button
              className="bg-[#5D2F77] px-2 h-full ml-1 rounded-md font-bold hover:bg-[#1c0a27] hover:text-[#FFACAC] text-[#E45A92] transition duration-200"
              onClick={() => copyPassword()}
            >
              Copy
            </button>
          </div>
          <div className="flex justify-around pb-2">
            <div className="flex justify-center content-center space-x-2">
              <input
                id="length"
                type="range"
                min={1}
                max={20}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="font-bold" htmlFor="length">
                Length : {length}
              </label>
            </div>
            <div className="flex justify-center content-center space-x-2">
              <input
                id="charInput"
                type="checkbox"
                defaultChecked={allowNum}
                onChange={() => setAllowNum((prev) => !prev)}
              />
              <label htmlFor="charInput" className="font-bold">
                Numbers
              </label>
            </div>
            <div className="flex justify-center content-center space-x-2">
              <input
                id="charInput"
                type="checkbox"
                defaultChecked={allowSpecial}
                onChange={() => setAllowSpecial((prev) => !prev)}
              />
              <label htmlFor="charInput" className="font-bold">
                Special Characters
              </label>
            </div>
          </div>
          <button
            onClick={() => generatePassword()}
            className="text-xl font-bold hover:bg-green-500 transition duration-200 bg-green-400 rounded-md p-2"
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
