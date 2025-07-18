"use client"
import React, { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState('');
  const [otherValue, setOtherValue] = useState('');
  const [dispenserOption, setDispenserOption] = useState('');
  const [dispenserOther, setDispenserOther] = useState('');
  const [toiletOption, setToiletOption] = useState('');
  const [toiletOther, setToiletOther] = useState('');

  return (
    <>
      <div className="flex justify-center items-start pt-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Report your Issue
        </h1>
      </div>

      {/* Aligned in one row with dropdowns below labels */}
      <div className="flex flex-row justify-start items-start ml-10 mt-10 gap-12 text-base font-bold">
        {/* Dustbin */}
        Choose Your Problem
        <div className="flex flex-col">
          <label>Dustbin</label>
          <select
            name="dustbin_issue"
            className="bg-white text-base rounded p-1 mt-1"
            required
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select</option>
            <option value="PartiallyFull">Partially Full</option>
            <option value="Overflowing">Overflowing</option>
            <option value="BadOdor">Bad Odor</option>
            <option value="NoDustbinAvailable">No Dustbin Available</option>
            <option value="LidBrokenDamaged">Lid Broken / Damaged</option>
            <option value="Other">Other</option>
          </select>
          {selected === 'Other' && (
            <input
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
            name="dispenser_issue"
            className="bg-white text-base rounded p-1 mt-1"
            required
            value={dispenserOption}
            onChange={(e) => setDispenserOption(e.target.value)}
          >
            <option value="">Select</option>
            <option value="NoDispenserAvailable">No Dispenser Available</option>
            <option value="NotDispensing">Not Dispensing</option>
            <option value="NoPads">No Pads</option>
            <option value="MachineOutofPower">Machine Out of Power</option>
            <option value="PaymentNotWorking">Payment Not Working</option>
            <option value="Damaged">Damaged</option>
            <option value="Other">Other</option>
          </select>
          {dispenserOption === 'Other' && (
            <input
              type="text"
              placeholder="Please specify"
              className="mt-2 p-2 border rounded text-base"
              value={dispenserOther}
              onChange={(e) => setDispenserOther(e.target.value)}
            />
          )}
        </div>

        {/* Toilet */}
        <div className="flex flex-col">
          <label>Toilet</label>
          <select
            name="toilet_issue"
            className="bg-white text-base rounded p-1 mt-1"
            required
            value={toiletOption}
            onChange={(e) => setToiletOption(e.target.value)}
          >
            <option value="">Select</option>
            <option value="UncleanToilet">Unclean Toilet</option>
            <option value="NoWaterSupply">No Water Supply</option>
            <option value="PoorVentilation">Poor Ventilation</option>
            <option value="NeedsImmediateCleaning">Needs Immediate Cleaning</option>
            <option value="Locked">Locked</option>
            <option value="Damaged">Damaged</option>
            <option value="Other">Other</option>
          </select>
          {toiletOption === 'Other' && (
            <input
              type="text"
              placeholder="Please specify"
              className="mt-2 p-2 border rounded text-base"
              value={toiletOther}
              onChange={(e) => setToiletOther(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="flex flex-row justify-start items-start ml-10 mt-10 gap-12 text-base font-bold">
        {/* Dustbin */}
        Choose Your Location
        <div className="flex flex-col">
          <label>Select Building</label>
          <select
            name="building"
            className="bg-white text-base rounded p-1 mt-1"
            required
          >
            <option value="">Select</option>
            <option value="A">A Building</option>
            <option value="B">B Building</option>
            
          </select>
        </div>
        <div className="flex flex-col">
          <label>Select Floor</label>
          <select
            name="floor"
            className="bg-white text-base rounded p-1 mt-1"
            required
          >
            <option value="">Select</option>
            <option value="one">1st Floor</option>
            <option value="two">2nd Floor</option>
            <option value="three">3rd Floor</option>
            <option value="four">4th Floor</option>
            <option value="fifth">5th Floor</option>
            <option value="sixth">6th Floor</option>
          </select>
        </div>

        
        </div>
      {/* new things */}
      
    </>
  );
}