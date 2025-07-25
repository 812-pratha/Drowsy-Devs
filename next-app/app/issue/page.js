"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [selected, setSelected] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [dispenserOption, setDispenserOption] = useState("");
  const [dispenserOther, setDispenserOther] = useState("");
  const [toiletOption, setToiletOption] = useState("");
  const [toiletOther, setToiletOther] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(null);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [message, setMessage] = useState("");

  function floorNumToWord(num) {
    const map = {
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six'
    };
    return map[num] || '';
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const locationParam = urlParams.get('location');

    if (locationParam) {
      if (locationParam.startsWith('buildingA')) {
        setBuilding('A');
        const floorNum = locationParam.replace('buildingA', '');
        setFloor(floorNumToWord(floorNum));
      } else if (locationParam.startsWith('buildingB')) {
        setBuilding('B');
        const floorNum = locationParam.replace('buildingB', '');
        setFloor(floorNumToWord(floorNum));
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      selected,
      otherValue,
      dispenserOption,
      dispenserOther,
      toiletOption,
      toiletOther,
      building,
      floor,
      isAnonymous,
      name: isAnonymous ? "Anonymous" : name,
      branch: isAnonymous ? "Anonymous" : branch,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/submit-issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || "Issue submitted successfully!");
        setSelected(""); setOtherValue(""); setDispenserOption(""); setDispenserOther("");
        setToiletOption(""); setToiletOther(""); setBuilding(""); setFloor("");
        setIsAnonymous(null); setName(""); setBranch("");
      } else {
        setMessage("Failed to submit issue.");
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          Report Your Issue
        </h1>
        <p className="text-gray-600 mt-2">Help us improve hygiene & maintenance</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl px-10 py-12 space-y-12"
      >
        {/* Problem Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Choose Your Problem</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Dustbin */}
            <div>
              <label className="font-semibold block mb-2">Dustbin</label>
              <select
                required
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select</option>
                <option value="Overflowing">Overflowing</option>
                <option value="BadOdor">Bad Odor</option>
                <option value="NoDustbinAvailable">No Dustbin Available</option>
                <option value="LidBrokenDamaged">Lid Broken / Damaged</option>
                <option value="Other">Other</option>
                <option value="noissue">No Issue</option>
              </select>
              {selected === "Other" && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                  className="mt-2 w-full p-2 border rounded"
                />
              )}
            </div>

            {/* Dispenser */}
            <div>
              <label className="font-semibold block mb-2">Dispenser</label>
              <select
                required
                value={dispenserOption}
                onChange={(e) => setDispenserOption(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select</option>
                <option value="NoDispenserAvailable">No Dispenser Available</option>
                <option value="NoPads">No Pads</option>
                <option value="MachineOutofPower">Machine Out of Power</option>
                <option value="PaymentNotWorking">Payment Not Working</option>
                <option value="Damaged">Damaged</option>
                <option value="Other">Other</option>
                <option value="noissue">No Issue</option>
              </select>
              {dispenserOption === "Other" && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={dispenserOther}
                  onChange={(e) => setDispenserOther(e.target.value)}
                  className="mt-2 w-full p-2 border rounded"
                />
              )}
            </div>

            {/* Toilet */}
            <div>
              <label className="font-semibold block mb-2">Toilet</label>
              <select
                required
                value={toiletOption}
                onChange={(e) => setToiletOption(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select</option>
                <option value="UncleanToilet">Unclean Toilet</option>
                <option value="NoWaterSupply">No Water Supply</option>
                <option value="NeedsImmediateCleaning">Needs Immediate Cleaning</option>
                <option value="Locked">Locked</option>
                <option value="Damaged">Damaged</option>
                <option value="Other">Other</option>
                <option value="noissue">No Issue</option>
              </select>
              {toiletOption === "Other" && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={toiletOther}
                  onChange={(e) => setToiletOther(e.target.value)}
                  className="mt-2 w-full p-2 border rounded"
                />
              )}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Choose Your Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="font-semibold block mb-2">Building</label>
              <select
                required
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select</option>
                <option value="A">A Building</option>
                <option value="B">B Building</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-2">Floor</label>
              <select
                required
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Select</option>
                <option value="one">1st Floor</option>
                <option value="two">2nd Floor</option>
                <option value="three">3rd Floor</option>
                <option value="four">4th Floor</option>
                <option value="five">5th Floor</option>
                <option value="six">6th Floor</option>
              </select>
            </div>
          </div>
        </section>

        {/* Anonymity */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
            Do you want your response to be Anonymous?
          </h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setIsAnonymous(true)}
              className={`px-4 py-2 rounded font-semibold ${isAnonymous ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setIsAnonymous(false)}
              className={`px-4 py-2 rounded font-semibold ${isAnonymous === false ? "bg-red-600 text-white" : "bg-gray-200"
                }`}
            >
              No
            </button>
          </div>
        </section>

        {/* Name + Branch */}
        {!isAnonymous && isAnonymous !== null && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="font-bold block mb-1">Name:</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Email:</label>
              <input
                required
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-8 text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 text-lg rounded-full shadow-md hover:shadow-lg transition"
          >
            Submit Issue
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="mt-6 text-center text-green-600 font-medium">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
