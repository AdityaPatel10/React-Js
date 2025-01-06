import { useId } from "react";

interface InputBoxProps {
  label?: string;
  className?: string;
  amount?: number;
  onAmountChange?: (amount: number) => void;
  amountDisabled?: boolean;
  currenyDisabled?: boolean;
  selectCurrency : string;
  onCurrenyChange?: (currency: string) => void;
  currencyOptions?: string[];
}
const InputBox = ({
  label,
  className = "",
  amount,
  onAmountChange,
  amountDisabled = false,
  currenyDisabled = false,
  selectCurrency,
  onCurrenyChange,
  currencyOptions = []
}: InputBoxProps) => {
  const amountInputId: string = useId();
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-black/40 mb-2 inline-block"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          disabled={amountDisabled}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          disabled={currenyDisabled}
          value={selectCurrency}
          onChange={(e)=>onCurrenyChange && onCurrenyChange(e.target.value)}
        >
          {currencyOptions.map((currency)=>(
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
