"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { friends, getCategoryFromText } from "@/lib/data";
import CategoryIcon from "@/components/CategoryIcon";
import Avatar from "@/components/Avatar";

export default function AddGroupPage() {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [showNewPerson, setShowNewPerson] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [extraPeople, setExtraPeople] = useState<{ name: string; email: string }[]>([]);
  const [created, setCreated] = useState(false);

  const category = groupName.trim() ? getCategoryFromText(groupName) : "general";
  const totalMembers = 1 + selectedFriends.length + extraPeople.length;
  const canCreate = groupName.trim().length > 0 && totalMembers >= 2;

  function toggleFriend(id: string) {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function addNewPerson() {
    if (!newName.trim() || !newEmail.includes("@")) return;
    setExtraPeople((prev) => [...prev, { name: newName.trim(), email: newEmail.trim() }]);
    setNewName("");
    setNewEmail("");
    setShowNewPerson(false);
  }

  function handleCreate() {
    if (!canCreate) return;
    setCreated(true);
    setTimeout(() => router.back(), 1800);
  }

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#F5F0EB] px-5 pt-14 pb-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="text-[13px] font-semibold text-[#9B8F86]">New group</p>
        <div className="w-9" />
      </div>

      <div className="px-5 pt-2 flex flex-col gap-6 pb-10">
        <div>
          <p className="text-2xl font-black text-[#1A1510] tracking-tight">Create a group</p>
          <p className="text-sm text-[#9B8F86] mt-1">Name it, add members, start splitting.</p>
        </div>

        {/* Group name */}
        <div>
          <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">Group name</label>
          <div className="flex gap-3 items-center">
            <div className="flex-shrink-0">
              <CategoryIcon category={category} />
            </div>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Road Trip, Apartment…"
              className="flex-1 bg-white rounded-2xl px-4 py-3.5 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none focus:ring-2 focus:ring-[#DF5830]/30"
            />
          </div>
          {groupName.trim() && (
            <p className="text-[11px] text-[#9B8F86] mt-1.5 ml-14">
              Category auto-set to <span className="font-semibold text-[#1A1510]">{category}</span>
            </p>
          )}
        </div>

        {/* Friends */}
        <div>
          <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">Add members</p>
          <ul className="flex flex-col gap-0">
            {friends.map((friend, idx) => {
              const selected = selectedFriends.includes(friend.id);
              return (
                <li key={friend.id}>
                  <button
                    onClick={() => toggleFriend(friend.id)}
                    className={`w-full flex items-center gap-3 py-3 text-left ${idx !== 0 ? "border-t border-[#E8E2DB]" : ""}`}
                  >
                    <Avatar avatarId={friend.avatarId} size="sm" />
                    <p className="flex-1 font-semibold text-[15px] text-[#1A1510]">{friend.name}</p>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selected ? "bg-[#1A1510] border-[#1A1510]" : "border-[#C4BCB5]"}`}>
                      {selected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Extra people added */}
        {extraPeople.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-2">New invites</p>
            <ul className="flex flex-col gap-0">
              {extraPeople.map((p, idx) => (
                <li key={p.email} className={`flex items-center gap-3 py-3 ${idx !== 0 ? "border-t border-[#E8E2DB]" : ""}`}>
                  <div className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center text-[12px] font-bold text-[#9B8F86]">
                    {p.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[15px] text-[#1A1510]">{p.name}</p>
                    <p className="text-xs text-[#9B8F86]">{p.email}</p>
                  </div>
                  <button onClick={() => setExtraPeople((prev) => prev.filter((x) => x.email !== p.email))}>
                    <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add new person */}
        {!showNewPerson ? (
          <button
            onClick={() => setShowNewPerson(true)}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#DF5830]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Invite someone not on Sharedue
          </button>
        ) : (
          <div className="bg-white rounded-3xl p-4 flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest">New person</p>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              className="w-full bg-[#F5F0EB] rounded-xl px-4 py-3 text-[14px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-[#F5F0EB] rounded-xl px-4 py-3 text-[14px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
            />
            <p className="text-[11px] text-[#9B8F86]">They'll get an email invite to sign up and join this group.</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowNewPerson(false); setNewName(""); setNewEmail(""); }}
                className="flex-1 py-3 rounded-2xl border border-[#E8E2DB] text-[13px] font-semibold text-[#9B8F86]"
              >
                Cancel
              </button>
              <button
                onClick={addNewPerson}
                disabled={!newName.trim() || !newEmail.includes("@")}
                className="flex-1 py-3 rounded-2xl bg-[#1A1510] text-[13px] font-bold text-white disabled:opacity-40"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* Create CTA */}
        <button
          onClick={handleCreate}
          disabled={!canCreate || created}
          className={`w-full py-4 rounded-3xl text-[14px] font-bold tracking-wide transition-all duration-200 ${
            created
              ? "bg-emerald-500 text-white"
              : canCreate
              ? "bg-[#1A1510] text-white active:scale-95"
              : "bg-[#E8E2DB] text-[#9B8F86]"
          }`}
        >
          {created
            ? "Group created ✓"
            : `Create group · ${totalMembers} ${totalMembers === 1 ? "person" : "people"}`}
        </button>
      </div>
    </div>
  );
}
