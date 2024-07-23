import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DownIcon, UpIcon } from "./Icons";

const CustomSelect = ({ value, options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const itemRef = useRef();

  const handleOutsideClick = (e) => {
    if (e.target.contains(dropdownRef.current)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    if (isOpen) {
      const activeItem = itemRef.current.querySelector(".active");
      itemRef.current.scrollTop = activeItem?.offsetTop - 72;
    }
  }, [isOpen]);
  return (
    <DropdownWrapper className="dropDownPrice" ref={dropdownRef}>
      <DropdownBtn onClick={() => setIsOpen(!isOpen)}>
        {value || placeholder}
        {!isOpen ? <DownIcon /> : <UpIcon />}
      </DropdownBtn>
      {isOpen && (
        <DropdownList ref={itemRef}>
          {options.map((opt, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={opt === value && "active"}
            >
              {opt}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default CustomSelect;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DropdownBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 244px;
  height: 44px;
  background-color: #253858;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  padding: 0 14px;
  cursor: pointer;
  svg {
    width: 16px;
  }
`;

const DropdownList = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  margin-top: 4px;
  border: 1px solid #eee;
  position: absolute;
  width: 100%;
  margin-top: 48px;
  max-height: 180px;
  overflow-y: auto;
`;

const DropdownItem = styled.button`
  min-height: 36px;
  background: #fff;
  border: none;
  color: #253858;
  text-align: left;
  cursor: pointer;
  padding: 0 14px;
  font-size: 14px;
  &.active,
  &:hover {
    background-color: #eee;
  }
`;