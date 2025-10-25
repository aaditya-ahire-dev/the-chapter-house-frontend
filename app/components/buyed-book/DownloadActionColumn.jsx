import React from "react";
import {DocumentIcon,CheckCircleIcon,ArrowRightIcon,SecureShieldIcon} from "@/app/services/IconSvg";
const getStatusText = (status) => {
  if(status === "reading") return "Reading";
  if(status === "downloaded") return "Owned";
  return "Not Downloaded";
};

const DownloadActionColumn = ({ bookStatus, onDownload }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-fadeInUp">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Status</span>
                <div className="text-xl font-bold text-blue-600 capitalize">
                  {getStatusText(bookStatus)}
                </div>
              </div>
              <div className="bg-blue-50 rounded-full p-3">
                <DocumentIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">PDF Format</p>
                  <p className="text-xs text-gray-500">High-quality digital document</p>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] relative overflow-hidden group"
              onClick={onDownload}
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span>
                  {bookStatus === "downloaded" || bookStatus === "reading"
                    ? "Download Again"
                    : "Download Book"}
                </span>
                <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" />
              </div>
            </button>

            <div className="flex items-center justify-center space-x-2 mt-6">
              <SecureShieldIcon className="w-5 h-5 text-green-500" />
              <p className="text-sm text-gray-600 font-medium">
                Secure download • Lifetime access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadActionColumn;