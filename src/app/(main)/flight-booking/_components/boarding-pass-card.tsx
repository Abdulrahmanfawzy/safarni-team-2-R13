import { Plane, Armchair } from "lucide-react";
import { FlightIllustration } from "./flight-illustration";

const qrRows = [
  "111111100101101111111",
  "100000101110001000001",
  "101110100101101011101",
  "101110101001001011101",
  "101110100111101011101",
  "100000101010101000001",
  "111111101010101111111",
  "000000001101100000000",
  "101101111001011011010",
  "011010001110100101101",
  "110111101011111000110",
  "001001011100010111001",
  "101111110011101001110",
  "000000001011010100101",
  "111111101101110011010",
  "100000101011001110101",
  "101110101110111010010",
  "101110100001010111100",
  "101110101111101001011",
  "100000100100011110010",
  "111111101011100101101",
];

function MockQrCode() {
  return (
    <div
      className="grid aspect-square w-full max-w-41 grid-cols-21 gap-[1px] bg-white"
      role="img"
      aria-label="Decorative boarding pass QR code"
    >
      {qrRows.flatMap((row, rowIndex) =>
        row
          .split("")
          .map((cell, colIndex) => (
            <span
              key={`${rowIndex}-${colIndex}`}
              className={cell === "1" ? "bg-black" : "bg-white"}
            />
          )),
      )}
    </div>
  );
}

function PassengerAvatar() {
  return (
    <div
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-[#f4eee8] text-[9px] font-semibold text-gray-600"
    >
      CD
    </div>
  );
}

export function BoardingPassCard() {
  return (
    <main className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 px-5 py-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-center lg:gap-10 lg:px-10">
      <section className="min-w-0">
        <FlightIllustration />
      </section>

      <section className="mx-auto w-full max-w-[345px]">
        <h1 className="mb-5 text-center text-[18px] font-semibold tracking-tight text-[#172033]">
          Boarding pass
        </h1>

        <article className="relative overflow-hidden rounded-[15px] border border-gray-100 bg-white shadow-[0_2px_6px_rgba(15,23,42,0.06)]">
          <div className="h-[6px] rounded-full bg-gradient-to-r from-[#7185ad] via-[#c3cde0] to-[#7185ad]" />

          <div className="px-3 pb-4 pt-2.5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-red-500 text-red-500">
                  <Plane size={9} />
                </span>
                <span className="text-[10px] font-medium text-[#172033]">
                  Air Canada
                </span>
              </div>

              <span className="text-right text-[13px] text-[#172033]">
                December 16th, 2022
              </span>
            </div>

            <div className="grid grid-cols-[1fr_0.65fr_1fr] items-start gap-2">
              <div>
                <p className="text-[14px] font-semibold text-[#172033]">
                  07h05
                </p>
                <p className="mt-1 text-[10px] font-semibold text-gray-500">
                  YUL
                </p>
              </div>

              <div className="flex flex-col items-center pt-1">
                <Plane size={12} className="text-[#172033]" />
                <span className="mt-1 text-[9px] text-gray-500">13h00</span>
              </div>

              <div className="text-right">
                <p className="text-[14px] font-semibold text-[#172033]">
                  20h05
                </p>
                <p className="mt-1 text-[10px] font-semibold text-gray-500">
                  NRT
                </p>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-4 border-y border-gray-200 py-2 text-center">
              <div>
                <p className="text-[13px] text-gray-500">8</p>
                <p className="mt-1 text-[10px] font-medium text-[#172033]">
                  Gate
                </p>
              </div>

              <div>
                <p className="text-[13px] text-gray-500">6</p>
                <p className="mt-1 text-[10px] font-medium text-[#172033]">
                  Seat
                </p>
              </div>

              <div>
                <p className="text-[13px] text-gray-500">3</p>
                <p className="mt-1 text-[10px] font-medium text-[#172033]">
                  Terminal
                </p>
              </div>

              <div>
                <p className="text-[13px] text-gray-500">AC006</p>
                <p className="mt-1 text-[10px] font-medium text-[#172033]">
                  Flight
                </p>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 border border-[#1685ff] px-2 py-1">
              <PassengerAvatar />

              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-medium text-[#172033]">
                  Catherine Dion
                </p>
                <p className="mt-0.5 text-[9px] text-gray-500">
                  24 years, Female
                </p>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <Armchair size={13} className="fill-[#1e429f] text-[#1e429f]" />
                <span className="text-[10px]">29A</span>
              </div>
            </div>

            <div className="flex justify-center pt-5 pb-1">
              <MockQrCode />
            </div>
          </div>
        </article>

        <button
          type="button"
          className="mt-4 h-[38px] w-full rounded-[5px] bg-[#2447a5] px-4 text-[13px] font-semibold text-white transition hover:bg-[#1e429f]"
        >
          Check Out
        </button>
      </section>
    </main>
  );
}
