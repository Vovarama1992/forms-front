import React from "react";


type AccordionItemProps = {
    item: {
        title: string;
        content: string[];
    };
    isOpen: boolean;
    onClick: () => void;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick }) => {
    return (
        <li className="relative border-b border-gray-200">
            <button
                type="button"
                className="w-full px-6 py-6 text-left"
                onClick={onClick}
            >
                <div className="flex items-center justify-between">
                    <span>{item.title}</span>
                    <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                            isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </button>
            <div
                className={`relative overflow-hidden transition-all duration-700 ${
                    isOpen ? "max-h-[500px]" : "max-h-0"
                }`}
            >
                <div className="px-6 pb-6">
                    { item.content.map((content, index) => {
                        return (
                            <div key={index}>{content}</div>
                        )
                    }) }
                </div>
            </div>
        </li>
    );
};

export default AccordionItem;
