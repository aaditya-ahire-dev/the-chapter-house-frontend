"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import BookCover from "@/app/components/BookCover";
import {ChevronDownIcon} from "@/app/services/IconSvg";

const STATUS_OPTIONS = {
  reading: { text: "Reading", color: "bg-blue-100 text-blue-600 border-blue-200" },
  downloaded: { text: "Owned", color: "bg-green-100 text-green-600 border-green-200" },
  not_downloaded: { text: "Not Downloaded", color: "bg-gray-100 text-gray-600 border-gray-200" },
};

const BookCoverColumn = ({ coverImage, title, bookStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentStatus = STATUS_OPTIONS[bookStatus] || STATUS_OPTIONS.not_downloaded;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (status) => {
    onStatusChange(status);
    setIsOpen(false);
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <BookCover coverImage={coverImage} title={title} />

        {/* --- Status Dropdown --- */}
        <div className="relative w-fit mx-auto mt-6">
          <button
            ref={dropdownRef}
            onClick={() => setIsOpen((s) => !s)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${currentStatus.color} shadow transition-all duration-300 w-40 animate-fadeInUp`}
          >
            <span>{currentStatus.text}</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && typeof window !== 'undefined' && createPortal(
            <DropdownPortal
              anchorRef={dropdownRef}
              onClose={() => setIsOpen(false)}
              onSelect={handleSelect}
              currentStatus={bookStatus}
            >
              {Object.entries(STATUS_OPTIONS).map(([statusKey, { text }]) => (
                <li key={statusKey}>
                  <button
                    onClick={() => handleSelect(statusKey)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400"
                    disabled={bookStatus === statusKey}
                  >
                    {text}
                  </button>
                </li>
              ))}
            </DropdownPortal>,
            document.body
          )}
        </div>
      </div>
    </div>
  );
};

function DropdownPortal({ anchorRef, onClose, onSelect, currentStatus, children }) {
  const [style, setStyle] = useState({ left: 0, top: 0, bottom: 'auto', width: 'auto' });

  useEffect(() => {
    const compute = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      const isLg = window.innerWidth >= 1024; // Tailwind lg breakpoint
      const width = rect.width;
      const left = rect.left + (rect.width - width) / 2;
      if (isLg) {
        // open upwards on large screens
        const bottom = window.innerHeight - rect.top + 8; // distance from bottom
        setStyle({ left: Math.max(8, left), top: 'auto', bottom, width });
      } else {
        // open downwards on small screens
        const top = rect.bottom + 8;
        setStyle({ left: Math.max(8, left), top, bottom: 'auto', width });
      }
    };

    compute();
    window.addEventListener('resize', compute);
    window.addEventListener('scroll', compute, true);
    return () => {
      window.removeEventListener('resize', compute);
      window.removeEventListener('scroll', compute, true);
    };
  }, [anchorRef]);

  return (
    <div
      style={{ position: 'fixed', left: style.left, top: style.top, bottom: style.bottom, width: style.width, zIndex: 9999 }}
      className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fadeIn"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <ul>
        {React.Children.map(children, (child) => (
          child
        ))}
      </ul>
    </div>
  );
}

export default BookCoverColumn;