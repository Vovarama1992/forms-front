import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

type AccordionProps = {
    data: {
        title: string;
        content: string[];
    }[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
    const [selected, setSelected] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setSelected(selected === index ? null : index);
    };

    return (
        <div className="w-screen flex max-w-full">
            <div className="container">
                <div className="">
                    {/* Колонка 1 */}
                    <div className="bg-white max-w-full mx-auto border border-gray-200">
                        <ul className="shadow-box">
                            {data.slice(0, 2).map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    item={item}
                                    isOpen={selected === index}
                                    onClick={() => toggleAccordion(index)}
                                />
                            ))}
                        </ul>
                    </div>

                    {/* Колонка 2 */}
                    <div className="bg-white max-w-full mx-auto border border-gray-200">
                        <ul className="shadow-box">
                            {data.slice(2).map((item, index) => (
                                <AccordionItem
                                    key={index + 2} // Учитываем смещение для второй колонки
                                    item={item}
                                    isOpen={selected === index + 2}
                                    onClick={() => toggleAccordion(index + 2)}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
