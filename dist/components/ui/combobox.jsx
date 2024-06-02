"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Combobox = void 0;
const React = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const command_1 = require("@/components/ui/command");
const popover_1 = require("@/components/ui/popover");
const Combobox = ({ options, value, onChange }) => {
    const [open, setOpen] = React.useState(false);
    return (<popover_1.Popover open={open} onOpenChange={setOpen}>
      <popover_1.PopoverTrigger asChild>
        <button_1.Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select option..."}
          <lucide_react_1.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </button_1.Button>
      </popover_1.PopoverTrigger>
      <popover_1.PopoverContent className="w-[200px] p-0">
        <command_1.Command>
          <command_1.CommandInput placeholder="Search option..."/>
          <command_1.CommandEmpty>No options found.</command_1.CommandEmpty>
          <command_1.CommandGroup>
            {options.map((option) => (<command_1.CommandItem key={option.value} onSelect={() => {
                onChange(option.value === value ? "" : option.value);
                setOpen(false);
            }}>
                <lucide_react_1.Check className={(0, utils_1.cn)("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")}/>
                {option.label}
              </command_1.CommandItem>))}
          </command_1.CommandGroup>
        </command_1.Command>
      </popover_1.PopoverContent>
    </popover_1.Popover>);
};
exports.Combobox = Combobox;
