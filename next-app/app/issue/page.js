"use client"
import React, { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState('');
  const [otherValue, setOtherValue] = useState('');
  const [dispenserOption, setDispenserOption] = useState('');
  const [dispenserOther, setDispenserOther] = useState('');
  const [toiletOption, setToiletOption] = useState('');
  const [toiletOther, setToiletOther] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(null);
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [message, setMessage] = useState("");

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
      const response = await fetch("http://localhost:5000/submit-issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Issue submitted successfully!");
        // Clear all fields
        setSelected(""); setOtherValue("");
        setDispenserOption(""); setDispenserOther("");
        setToiletOption(""); setToiletOther("");
        setBuilding(""); setFloor("");
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
    <>
      <div className="flex justify-center items-start pt-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Report your Issue
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Issue Selection */}
        <div className="flex flex-row justify-start items-start ml-10 mt-10 gap-12 text-base font-bold">
            Choose Your Problem
          {/* Dustbin */}
          <div className="flex flex-col">
            <label>Dustbin</label>
            <select
              id="selected"
              className="bg-white text-base rounded p-1 mt-1"
              required
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Overflowing">Overflowing</option>
              <option value="BadOdor">Bad Odor</option>
              <option value="NoDustbinAvailable">No Dustbin Available</option>
              <option value="LidBrokenDamaged">Lid Broken / Damaged</option>
              <option value="Other">Other</option>
              <option value="noissue">No Issue</option>
            </select>
            {selected === 'Other' && (
              <input
              id="othervalue"
                type="text"
                placeholder="Please specify"
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                className="mt-2 p-2 border rounded text-base"
              />
            )}
          </div>

          {/* Dispenser */}
          <div className="flex flex-col">
            <label>Dispenser</label>
            <select
              id="dispenser"
              className="bg-white text-base rounded p-1 mt-1"
              required
              value={dispenserOption}
              onChange={(e) => setDispenserOption(e.target.value)}
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
            {dispenserOption === 'Other' && (
              <input
                id="dispenserOther"
                type="text"
                placeholder="Please specify"
                value={dispenserOther}
                onChange={(e) => setDispenserOther(e.target.value)}
                className="mt-2 p-2 border rounded text-base"
              />
            )}
          </div>

          {/* Toilet */}
          <div className="flex flex-col">
            <label>Washroom</label>
            <select
              id="toiletOption"
              className="bg-white text-base rounded p-1 mt-1"
              required
              value={toiletOption}
              onChange={(e) => setToiletOption(e.target.value)}
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
            {toiletOption === 'Other' && (
              <input
                id="toiletOther"
                type="text"
                placeholder="Please specify"
                value={toiletOther}
                onChange={(e) => setToiletOther(e.target.value)}
                className="mt-2 p-2 border rounded text-base"
              />
            )}
          </div>
        </div>
        {/* location */}
      <div className="flex flex-row justify-start items-start ml-10 mt-10 gap-12 text-base font-bold">
        
        Choose Your Location
        <div className="flex flex-col">
          <label>Building</label>
          <select
            id="building"
            name="building"
            className="bg-white text-base rounded p-1 mt-1"
            required
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          >
            <option value="">Select</option>
            <option value="A_Building">A Building</option>
            <option value="B_Building">B Building</option>
            
          </select>
        </div>
        {/* floor */}
        <div className="flex flex-col">
          <label>Floor</label>
          <select
            id="floor"
            name="floor"
            className="bg-white text-base rounded p-1 mt-1"
            required
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
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


        {/* Anonymous Selection */}
        <div className="text-l ml-10 mt-10 font-bold">
          Do you want your response to be recorded as Anonymous?
          <div className="mt-2 space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => setIsAnonymous(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setIsAnonymous(false)}
            >
              No
            </button>
          </div>
        </div>

        {/* Name and Branch fields if not anonymous */}
        {isAnonymous === false && (
          <div className="ml-10 mt-6 space-y-4 text-base">
            <div>
              <label className="block font-bold">Name:</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded w-64"
              />
            </div>
            <div>
              <label className="block font-bold">Branch:</label>
              <input
                id="branch"
                type="text"
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="p-2 border rounded w-64"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="ml-10 mt-10">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Issue
          </button>
        </div>

        {/* Message */}
        {message && <div className="ml-10 mt-4 text-green-600">{message}</div>}
      </form>
    </>
  );
}
