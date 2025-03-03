import { useEffect, useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
function App() {
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("inr");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const currencyInfo: Record<string, number> = useCurrencyInfo(from);
  const options: string[] = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setConvertedAmount(amount * (currencyInfo[to] || 1));
    }, 300);

    return () => clearTimeout(handler);
  }, [amount, from, to, currencyInfo]);
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <h1 className="text-2xl font-extrabold text-center text-teal-950 drop-shadow-lg mb-6 ">
          CURRENCY CONVERTER
        </h1>
          <form
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   convert();
            // }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrenyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                // onAmountChange={(amount) => setAmount(amount)}
                onCurrenyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisabled
              />
            </div>
            {/* <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
