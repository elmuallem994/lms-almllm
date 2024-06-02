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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
const React = __importStar(require("react"));
const react_table_1 = require("@tanstack/react-table");
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const table_1 = require("@/components/ui/table");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
function DataTable({ columns, data, }) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const table = (0, react_table_1.useReactTable)({
        data,
        columns,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        getPaginationRowModel: (0, react_table_1.getPaginationRowModel)(),
        onSortingChange: setSorting,
        getSortedRowModel: (0, react_table_1.getSortedRowModel)(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: (0, react_table_1.getFilteredRowModel)(),
        state: {
            sorting,
            columnFilters,
        },
    });
    return (<div>
      <div className="flex items-center py-4 justify-between
      ">
        <input_1.Input placeholder="Filter courses..." value={table.getColumn("title")?.getFilterValue() ?? ""} onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)} className="max-w-sm"/>
        <link_1.default href="/teacher/create">
          <button_1.Button>
            <lucide_react_1.PlusCircle className=" h-4 w-4 mr-2"/>
            New course
          </button_1.Button>
        </link_1.default>
      </div>

      <div className="rounded-md border">
        <table_1.Table>
          <table_1.TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (<table_1.TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                return (<table_1.TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : (0, react_table_1.flexRender)(header.column.columnDef.header, header.getContext())}
                    </table_1.TableHead>);
            })}
              </table_1.TableRow>))}
          </table_1.TableHeader>
          <table_1.TableBody>
            {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (<table_1.TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (<table_1.TableCell key={cell.id}>
                      {(0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext())}
                    </table_1.TableCell>))}
                </table_1.TableRow>))) : (<table_1.TableRow>
                <table_1.TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </table_1.TableCell>
              </table_1.TableRow>)}
          </table_1.TableBody>
        </table_1.Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <button_1.Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button_1.Button>
        <button_1.Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button_1.Button>
      </div>
    </div>);
}
exports.DataTable = DataTable;
