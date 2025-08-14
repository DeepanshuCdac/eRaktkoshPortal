import React from "react";
import { Card, Space, Typography } from "antd"; // Importing Ant Design components

const { Text, Title } = Typography;

const ProfileName = ({ name, age, gender }) => {
  return (
    <>
      <div>
        <p>{name}</p>
        <p>{age}</p>
        <p>{gender}</p>
      </div>
    </>
  );
};

export default function PersonCards() {
  const people = [
    {
      name: "Deepanshu",
      age: 25,
      gender: "Male",
    },
    {
      name: "Rohit",
      age: 28,
      gender: "Male",
    },
    {
      name: "Sajal",
      age: 25,
      gender: "Male",
    },
    {
      name: "Anand",
      age: 24,
      gender: "Male",
    },
  ];

  return (
    <div className="d-flex">
      <Space
        direction="horizontal"
        size="middle"
        style={{ width: "100%", padding: "20px" }}
      >
        {people.map((person, index) => (
          <ProfileName
            key={index}
            name={person.name}
            age={person.age}
            gender={person.gender}
          />
        ))}
      </Space>
    </div>
  );
}
