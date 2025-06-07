"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./index";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Heart,
  Settings,
  Home,
  Coffee,
  Camera,
  Music,
  Book,
} from "lucide-react";

export function SelectWithIcon() {
  return (
    <Select>
      <SelectTrigger icon={User}>
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="john" icon={User}>
          John Doe
        </SelectItem>
        <SelectItem value="jane" icon={User}>
          Jane Smith
        </SelectItem>
        <SelectItem value="bob" icon={User}>
          Bob Johnson
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export function SelectWithGroups() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select contact method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Digital</SelectLabel>
          <SelectItem value="email" icon={Mail}>
            Email
          </SelectItem>
          <SelectItem value="phone" icon={Phone}>
            Phone
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Physical</SelectLabel>
          <SelectItem value="mail" icon={MapPin}>
            Mail
          </SelectItem>
          <SelectItem value="visit" icon={Home}>
            In Person
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SelectWithDisabled() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="available" icon={Star}>
          Available Option
        </SelectItem>
        <SelectItem value="disabled" icon={Heart} disabled>
          Disabled Option
        </SelectItem>
        <SelectItem value="another" icon={Settings}>
          Another Option
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export function SelectVariants() {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Default variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Outline</label>
        <Select>
          <SelectTrigger variant="outline">
            <SelectValue placeholder="Outline variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Ghost</label>
        <Select>
          <SelectTrigger variant="ghost">
            <SelectValue placeholder="Ghost variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function SelectSizes() {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Small</label>
        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Small select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Default select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Large</label>
        <Select>
          <SelectTrigger size="lg">
            <SelectValue placeholder="Large select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function SelectDisabledExample() {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Disabled Select
        </label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="This select is disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function SelectScrollable() {
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Austria",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Poland",
    "Czech Republic",
    "Hungary",
    "Portugal",
    "Greece",
    "Ireland",
    "Luxembourg",
    "Slovenia",
    "Slovakia",
    "Estonia",
    "Latvia",
    "Lithuania",
    "Malta",
    "Cyprus",
    "Bulgaria",
    "Romania",
    "Croatia",
    "Australia",
    "New Zealand",
    "Japan",
    "South Korea",
    "Singapore",
    "Hong Kong",
    "Taiwan",
    "India",
    "Brazil",
    "Mexico",
    "Argentina",
    "Chile",
    "Colombia",
  ];

  return (
    <Select>
      <SelectTrigger icon={MapPin}>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          {countries.map((country) => (
            <SelectItem
              key={country}
              value={country.toLowerCase().replace(/\s+/g, "-")}
            >
              {country}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
