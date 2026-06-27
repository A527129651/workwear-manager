import { useState, useEffect, useRef, useCallback } from "react";

// ===== DATA =====
const INITIAL_EMPLOYEES = [
  { id: 1, employeeNum: "E001", name: "משה כהן", department: "ייצור", phone: "050-1234567", type: "permanent", status: "active" },
  { id: 2, employeeNum: "E002", name: "דוד לוי", department: "אחסנה", phone: "052-7654321", type: "permanent", status: "active" },
  { id: 3, employeeNum: "E003", name: "רחל ישראלי", department: "ייצור", phone: "054-1111222", type: "permanent", status: "active" },
  { id: 4, employeeNum: "T001", name: "יוסף אברהם", department: "", phone: "", type: "temporary", status: "active" },
];

const INITIAL_CLOTHES = [
  { id: 1, barcode: "S001", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 2, barcode: "S002", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 3, barcode: "S003", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 4, barcode: "S004", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 5, barcode: "S005", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 6, barcode: "S006", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 7, barcode: "S007", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 8, barcode: "S008", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 9, barcode: "S009", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 10, barcode: "S010", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 11, barcode: "S011", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 12, barcode: "S012", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 13, barcode: "S013", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 14, barcode: "S014", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 15, barcode: "S015", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 16, barcode: "S016", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 17, barcode: "S017", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 18, barcode: "S018", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 19, barcode: "S019", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 20, barcode: "S020", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 21, barcode: "S021", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 22, barcode: "S022", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 23, barcode: "S023", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 24, barcode: "S024", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 25, barcode: "S025", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 26, barcode: "S026", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 27, barcode: "S027", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 28, barcode: "S028", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 29, barcode: "S029", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 30, barcode: "S030", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 31, barcode: "S031", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 32, barcode: "S032", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 33, barcode: "S033", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 34, barcode: "S034", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 35, barcode: "S035", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 36, barcode: "S036", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 37, barcode: "S037", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 38, barcode: "S038", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 39, barcode: "S039", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 40, barcode: "S040", type: "חולצה", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 41, barcode: "M001", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 42, barcode: "M002", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 43, barcode: "M003", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 44, barcode: "M004", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 45, barcode: "M005", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 46, barcode: "M006", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 47, barcode: "M007", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 48, barcode: "M008", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 49, barcode: "M009", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 50, barcode: "M010", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 51, barcode: "M011", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 52, barcode: "M012", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 53, barcode: "M013", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 54, barcode: "M014", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 55, barcode: "M015", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 56, barcode: "M016", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 57, barcode: "M017", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 58, barcode: "M018", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 59, barcode: "M019", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 60, barcode: "M020", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 61, barcode: "M021", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 62, barcode: "M022", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 63, barcode: "M023", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 64, barcode: "M024", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 65, barcode: "M025", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 66, barcode: "M026", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 67, barcode: "M027", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 68, barcode: "M028", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 69, barcode: "M029", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 70, barcode: "M030", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 71, barcode: "M031", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 72, barcode: "M032", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 73, barcode: "M033", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 74, barcode: "M034", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 75, barcode: "M035", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 76, barcode: "M036", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 77, barcode: "M037", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 78, barcode: "M038", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 79, barcode: "M039", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 80, barcode: "M040", type: "חולצה", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 81, barcode: "L001", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 82, barcode: "L002", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 83, barcode: "L003", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 84, barcode: "L004", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 85, barcode: "L005", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 86, barcode: "L006", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 87, barcode: "L007", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 88, barcode: "L008", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 89, barcode: "L009", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 90, barcode: "L010", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 91, barcode: "L011", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 92, barcode: "L012", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 93, barcode: "L013", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 94, barcode: "L014", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 95, barcode: "L015", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 96, barcode: "L016", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 97, barcode: "L017", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 98, barcode: "L018", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 99, barcode: "L019", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 100, barcode: "L020", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 101, barcode: "L021", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 102, barcode: "L022", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 103, barcode: "L023", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 104, barcode: "L024", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 105, barcode: "L025", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 106, barcode: "L026", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 107, barcode: "L027", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 108, barcode: "L028", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 109, barcode: "L029", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 110, barcode: "L030", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 111, barcode: "L031", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 112, barcode: "L032", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 113, barcode: "L033", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 114, barcode: "L034", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 115, barcode: "L035", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 116, barcode: "L036", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 117, barcode: "L037", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 118, barcode: "L038", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 119, barcode: "L039", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 120, barcode: "L040", type: "חולצה", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 121, barcode: "XL001", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 122, barcode: "XL002", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 123, barcode: "XL003", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 124, barcode: "XL004", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 125, barcode: "XL005", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 126, barcode: "XL006", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 127, barcode: "XL007", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 128, barcode: "XL008", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 129, barcode: "XL009", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 130, barcode: "XL010", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 131, barcode: "XL011", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 132, barcode: "XL012", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 133, barcode: "XL013", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 134, barcode: "XL014", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 135, barcode: "XL015", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 136, barcode: "XL016", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 137, barcode: "XL017", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 138, barcode: "XL018", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 139, barcode: "XL019", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 140, barcode: "XL020", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 141, barcode: "XL021", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 142, barcode: "XL022", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 143, barcode: "XL023", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 144, barcode: "XL024", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 145, barcode: "XL025", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 146, barcode: "XL026", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 147, barcode: "XL027", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 148, barcode: "XL028", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 149, barcode: "XL029", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 150, barcode: "XL030", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 151, barcode: "XL031", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 152, barcode: "XL032", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 153, barcode: "XL033", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 154, barcode: "XL034", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 155, barcode: "XL035", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 156, barcode: "XL036", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 157, barcode: "XL037", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 158, barcode: "XL038", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 159, barcode: "XL039", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 160, barcode: "XL040", type: "חולצה", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 161, barcode: "XXL001", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 162, barcode: "XXL002", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 163, barcode: "XXL003", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 164, barcode: "XXL004", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 165, barcode: "XXL005", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 166, barcode: "XXL006", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 167, barcode: "XXL007", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 168, barcode: "XXL008", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 169, barcode: "XXL009", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 170, barcode: "XXL010", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 171, barcode: "XXL011", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 172, barcode: "XXL012", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 173, barcode: "XXL013", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 174, barcode: "XXL014", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 175, barcode: "XXL015", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 176, barcode: "XXL016", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 177, barcode: "XXL017", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 178, barcode: "XXL018", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 179, barcode: "XXL019", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 180, barcode: "XXL020", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 181, barcode: "XXL021", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 182, barcode: "XXL022", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 183, barcode: "XXL023", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 184, barcode: "XXL024", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 185, barcode: "XXL025", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 186, barcode: "XXL026", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 187, barcode: "XXL027", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 188, barcode: "XXL028", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 189, barcode: "XXL029", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 190, barcode: "XXL030", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 191, barcode: "XXL031", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 192, barcode: "XXL032", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 193, barcode: "XXL033", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 194, barcode: "XXL034", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 195, barcode: "XXL035", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 196, barcode: "XXL036", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 197, barcode: "XXL037", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 198, barcode: "XXL038", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 199, barcode: "XXL039", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 200, barcode: "XXL040", type: "חולצה", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 201, barcode: "P-S001", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 202, barcode: "P-S002", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 203, barcode: "P-S003", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 204, barcode: "P-S004", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 205, barcode: "P-S005", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 206, barcode: "P-S006", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 207, barcode: "P-S007", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 208, barcode: "P-S008", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 209, barcode: "P-S009", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 210, barcode: "P-S010", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 211, barcode: "P-S011", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 212, barcode: "P-S012", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 213, barcode: "P-S013", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 214, barcode: "P-S014", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 215, barcode: "P-S015", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 216, barcode: "P-S016", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 217, barcode: "P-S017", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 218, barcode: "P-S018", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 219, barcode: "P-S019", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 220, barcode: "P-S020", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 221, barcode: "P-S021", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 222, barcode: "P-S022", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 223, barcode: "P-S023", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 224, barcode: "P-S024", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 225, barcode: "P-S025", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 226, barcode: "P-S026", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 227, barcode: "P-S027", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 228, barcode: "P-S028", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 229, barcode: "P-S029", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 230, barcode: "P-S030", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 231, barcode: "P-S031", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 232, barcode: "P-S032", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 233, barcode: "P-S033", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 234, barcode: "P-S034", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 235, barcode: "P-S035", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 236, barcode: "P-S036", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 237, barcode: "P-S037", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 238, barcode: "P-S038", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 239, barcode: "P-S039", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 240, barcode: "P-S040", type: "מכנס", size: "S", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 241, barcode: "P-M001", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 242, barcode: "P-M002", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 243, barcode: "P-M003", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 244, barcode: "P-M004", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 245, barcode: "P-M005", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 246, barcode: "P-M006", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 247, barcode: "P-M007", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 248, barcode: "P-M008", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 249, barcode: "P-M009", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 250, barcode: "P-M010", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 251, barcode: "P-M011", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 252, barcode: "P-M012", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 253, barcode: "P-M013", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 254, barcode: "P-M014", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 255, barcode: "P-M015", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 256, barcode: "P-M016", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 257, barcode: "P-M017", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 258, barcode: "P-M018", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 259, barcode: "P-M019", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 260, barcode: "P-M020", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 261, barcode: "P-M021", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 262, barcode: "P-M022", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 263, barcode: "P-M023", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 264, barcode: "P-M024", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 265, barcode: "P-M025", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 266, barcode: "P-M026", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 267, barcode: "P-M027", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 268, barcode: "P-M028", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 269, barcode: "P-M029", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 270, barcode: "P-M030", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 271, barcode: "P-M031", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 272, barcode: "P-M032", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 273, barcode: "P-M033", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 274, barcode: "P-M034", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 275, barcode: "P-M035", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 276, barcode: "P-M036", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 277, barcode: "P-M037", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 278, barcode: "P-M038", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 279, barcode: "P-M039", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 280, barcode: "P-M040", type: "מכנס", size: "M", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 281, barcode: "P-L001", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 282, barcode: "P-L002", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 283, barcode: "P-L003", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 284, barcode: "P-L004", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 285, barcode: "P-L005", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 286, barcode: "P-L006", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 287, barcode: "P-L007", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 288, barcode: "P-L008", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 289, barcode: "P-L009", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 290, barcode: "P-L010", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 291, barcode: "P-L011", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 292, barcode: "P-L012", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 293, barcode: "P-L013", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 294, barcode: "P-L014", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 295, barcode: "P-L015", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 296, barcode: "P-L016", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 297, barcode: "P-L017", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 298, barcode: "P-L018", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 299, barcode: "P-L019", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 300, barcode: "P-L020", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 301, barcode: "P-L021", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 302, barcode: "P-L022", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 303, barcode: "P-L023", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 304, barcode: "P-L024", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 305, barcode: "P-L025", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 306, barcode: "P-L026", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 307, barcode: "P-L027", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 308, barcode: "P-L028", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 309, barcode: "P-L029", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 310, barcode: "P-L030", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 311, barcode: "P-L031", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 312, barcode: "P-L032", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 313, barcode: "P-L033", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 314, barcode: "P-L034", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 315, barcode: "P-L035", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 316, barcode: "P-L036", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 317, barcode: "P-L037", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 318, barcode: "P-L038", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 319, barcode: "P-L039", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 320, barcode: "P-L040", type: "מכנס", size: "L", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 321, barcode: "P-XL001", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 322, barcode: "P-XL002", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 323, barcode: "P-XL003", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 324, barcode: "P-XL004", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 325, barcode: "P-XL005", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 326, barcode: "P-XL006", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 327, barcode: "P-XL007", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 328, barcode: "P-XL008", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 329, barcode: "P-XL009", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 330, barcode: "P-XL010", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 331, barcode: "P-XL011", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 332, barcode: "P-XL012", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 333, barcode: "P-XL013", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 334, barcode: "P-XL014", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 335, barcode: "P-XL015", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 336, barcode: "P-XL016", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 337, barcode: "P-XL017", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 338, barcode: "P-XL018", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 339, barcode: "P-XL019", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 340, barcode: "P-XL020", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 341, barcode: "P-XL021", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 342, barcode: "P-XL022", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 343, barcode: "P-XL023", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 344, barcode: "P-XL024", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 345, barcode: "P-XL025", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 346, barcode: "P-XL026", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 347, barcode: "P-XL027", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 348, barcode: "P-XL028", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 349, barcode: "P-XL029", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 350, barcode: "P-XL030", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 351, barcode: "P-XL031", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 352, barcode: "P-XL032", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 353, barcode: "P-XL033", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 354, barcode: "P-XL034", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 355, barcode: "P-XL035", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 356, barcode: "P-XL036", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 357, barcode: "P-XL037", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 358, barcode: "P-XL038", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 359, barcode: "P-XL039", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 360, barcode: "P-XL040", type: "מכנס", size: "XL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 361, barcode: "P-XXL001", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 362, barcode: "P-XXL002", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 363, barcode: "P-XXL003", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 364, barcode: "P-XXL004", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 365, barcode: "P-XXL005", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 366, barcode: "P-XXL006", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 367, barcode: "P-XXL007", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 368, barcode: "P-XXL008", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 369, barcode: "P-XXL009", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 370, barcode: "P-XXL010", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 371, barcode: "P-XXL011", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 372, barcode: "P-XXL012", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 373, barcode: "P-XXL013", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 374, barcode: "P-XXL014", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 375, barcode: "P-XXL015", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 376, barcode: "P-XXL016", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 377, barcode: "P-XXL017", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 378, barcode: "P-XXL018", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 379, barcode: "P-XXL019", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 380, barcode: "P-XXL020", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 381, barcode: "P-XXL021", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 382, barcode: "P-XXL022", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 383, barcode: "P-XXL023", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 384, barcode: "P-XXL024", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 385, barcode: "P-XXL025", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 386, barcode: "P-XXL026", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 387, barcode: "P-XXL027", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 388, barcode: "P-XXL028", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 389, barcode: "P-XXL029", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 390, barcode: "P-XXL030", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 391, barcode: "P-XXL031", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 392, barcode: "P-XXL032", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 393, barcode: "P-XXL033", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 394, barcode: "P-XXL034", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 395, barcode: "P-XXL035", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 396, barcode: "P-XXL036", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 397, barcode: "P-XXL037", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 398, barcode: "P-XXL038", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 399, barcode: "P-XXL039", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null },
  { id: 400, barcode: "P-XXL040", type: "מכנס", size: "XXL", color: "", purchaseDate: "2025-01-01", washCount: 0, status: "במלאי", assignedTo: null }
];

const INITIAL_TRANSACTIONS = [];

// מצבים ותנועות חוקיות
const VALID_STATUS = ["במלאי", "נמסר לעובד", "הוחזר", "בכביסה", "תקול", "אבוד", "הושמד"];
const STATUS_COLORS = {
  "במלאי":         { bg: "#E8F5E9", text: "#2E7D32", dot: "#4CAF50" },
  "נמסר לעובד":   { bg: "#E3F2FD", text: "#1565C0", dot: "#2196F3" },
  "הוחזר":        { bg: "#F3E5F5", text: "#6A1B9A", dot: "#9C27B0" },
  "בכביסה":        { bg: "#FFF8E1", text: "#E65100", dot: "#FF9800" },
  "תקול":         { bg: "#FBE9E7", text: "#BF360C", dot: "#FF5722" },
  "אבוד":         { bg: "#FFEBEE", text: "#B71C1C", dot: "#F44336" },
  "הושמד":        { bg: "#ECEFF1", text: "#37474F", dot: "#90A4AE" },
};
const CLOTHING_TYPES = ["חולצה", "מכנס", "מעיל", "כובע", "נעליים", "חגורה"];

const USERS = [
  { id: "editor", username: "admin", password: process.env.REACT_APP_ADMIN_PASS || "change_me", name: "אחראי המערכת", role: "editor" },
  { id: "viewer", username: "manager", password: process.env.REACT_APP_MANAGER_PASS || "change_me", name: "מנהל (צפייה)", role: "viewer" },
];

function useLS(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

// ===== ICONS =====
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    employees: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    shirt: <><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></>,
    handout: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></>,
    returns: <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.93"/></>,
    reports: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    history: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ===== SCAN VALIDATION ENGINE =====
// זהו הלב של המערכת – בדיקת 4 שלבים לכל סריקה
function validateScan(barcode, clothes, employees, transactions, mode) {
  // שלב 1: האם הברקוד קיים?
  const cloth = clothes.find(c => c.barcode === barcode);
  if (!cloth) return { ok: false, type: "error", msg: `ברקוד לא מוכר: "${barcode}"`, cloth: null, employee: null };

  const currentStatus = cloth.status;

  // שלב 2+3+4: בדיקת חוקיות לפי מסך
  if (mode === "handout") {
    if (currentStatus === "נמסר לעובד") {
      const assignedEmp = employees.find(e => e.id === cloth.assignedTo);
      return {
        ok: false, type: "blocked",
        msg: `⛔ לא ניתן למסור בגד זה. הבגד עדיין משויך ל${assignedEmp ? assignedEmp.name : "עובד אחר"} ולא נסרק כהחזרה.`,
        cloth, employee: assignedEmp
      };
    }
    if (currentStatus !== "במלאי") {
      return { ok: false, type: "warning", msg: `הבגד אינו פנוי. הסטטוס הנוכחי: "${currentStatus}"`, cloth, employee: null };
    }
    return { ok: true, type: "success", msg: `✓ ${cloth.type} (${cloth.barcode}) – ${cloth.size} ${cloth.color}`, cloth, employee: null };
  }

  if (mode === "returns") {
    if (currentStatus !== "נמסר לעובד") {
      return {
        ok: false, type: "warning",
        msg: `הבגד אינו מסומן כ"נמסר לעובד". הסטטוס הנוכחי: "${currentStatus}"`,
        cloth, employee: null
      };
    }
    const assignedEmp = employees.find(e => e.id === cloth.assignedTo);
    return {
      ok: true, type: "success",
      msg: `✓ ${cloth.type} (${cloth.barcode}) – הוחזר מ${assignedEmp ? assignedEmp.name : "עובד לא ידוע"}`,
      cloth, employee: assignedEmp
    };
  }

  return { ok: true, type: "success", msg: "בגד נמצא", cloth, employee: null };
}

// ===== MAIN APP =====
export default function App() {
  const [employees, setEmployees] = useLS("ww3_employees", INITIAL_EMPLOYEES);
  const [clothes, setClothes] = useLS("ww3_clothes", INITIAL_CLOTHES);
  const [transactions, setTransactions] = useLS("ww3_transactions", INITIAL_TRANSACTIONS);
  const [auditLog, setAuditLog] = useLS("ww3_audit", []);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const nextId = useCallback((arr) => arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1, []);

  const addAudit = useCallback((action, detail, userId) => {
    setAuditLog(prev => [...prev, { id: Date.now(), datetime: new Date().toISOString(), action, detail, userId }]);
  }, [setAuditLog]);

  const isEditor = currentUser?.role === "editor";

  if (!currentUser) return <LoginScreen onLogin={setCurrentUser} />;

  const navItems = [
    { id: "dashboard", label: "דשבורד", icon: "dashboard" },
    { id: "employees", label: "עובדים", icon: "employees" },
    { id: "clothes", label: "בגדים", icon: "shirt" },
    ...(isEditor ? [
      { id: "handout", label: "מסירת בגדים", icon: "handout" },
      { id: "returns", label: "החזרת בגדים", icon: "returns" },
    ] : []),
    { id: "reports", label: "דוחות", icon: "reports" },
  ];

  const stats = {
    totalEmployees: employees.filter(e => e.status === "active").length,
    inStock: clothes.filter(c => c.status === "במלאי").length,
    withEmployees: clothes.filter(c => c.status === "נמסר לעובד").length,
    inLaundry: clothes.filter(c => c.status === "בכביסה").length,
    broken: clothes.filter(c => c.status === "תקול").length,
    lost: clothes.filter(c => c.status === "אבוד").length,
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F0F2F5", fontFamily: "'Segoe UI', Arial, sans-serif", direction: "rtl" }}>
      {/* Sidebar */}
      <div style={{ width: sidebarOpen ? 240 : 64, background: "#1A2332", display: "flex", flexDirection: "column", transition: "width 0.25s ease", overflow: "hidden", flexShrink: 0, zIndex: 100 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12, minHeight: 64 }}>
          <div style={{ width: 32, height: 32, background: "#FF6B35", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="shirt" size={18} color="white" />
          </div>
          {sidebarOpen && <span style={{ color: "white", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap" }}>WorkWear Manager</span>}
        </div>
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              display: "flex", alignItems: "center", gap: 12, width: "100%",
              padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer",
              background: page === item.id ? "rgba(255,107,53,0.15)" : "transparent",
              color: page === item.id ? "#FF6B35" : "rgba(255,255,255,0.65)",
              marginBottom: 2, textAlign: "right", whiteSpace: "nowrap", transition: "all 0.15s",
            }}>
              <Icon name={item.icon} size={18} color={page === item.id ? "#FF6B35" : "rgba(255,255,255,0.65)"} />
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: page === item.id ? 600 : 400 }}>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {sidebarOpen && (
            <div style={{ padding: "8px 12px", marginBottom: 4 }}>
              <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{currentUser.name}</div>
              <div style={{ color: isEditor ? "#FB923C" : "#60A5FA", fontSize: 11, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Icon name={isEditor ? "edit" : "lock"} size={11} color={isEditor ? "#FB923C" : "#60A5FA"} />
                {isEditor ? "עריכה מלאה" : "צפייה בלבד"}
              </div>
            </div>
          )}
          <button onClick={() => setCurrentUser(null)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.45)", textAlign: "right" }}>
            <Icon name="logout" size={18} color="rgba(255,255,255,0.45)" />
            {sidebarOpen && <span style={{ fontSize: 14 }}>התנתק</span>}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "white", padding: "0 24px", height: 64, display: "flex", alignItems: "center", borderBottom: "1px solid #E5E7EB", gap: 16 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>{navItems.find(n => n.id === page)?.label}</span>
          {!isEditor && (
            <span style={{ fontSize: 11, background: "#DBEAFE", color: "#1D4ED8", padding: "3px 10px", borderRadius: 6, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="lock" size={11} color="#1D4ED8" /> צפייה בלבד
            </span>
          )}
          <div style={{ marginRight: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: isEditor ? "#FF6B35" : "#2196F3", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14 }}>
              {currentUser.name[0]}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {page === "dashboard" && <Dashboard stats={stats} employees={employees} clothes={clothes} transactions={transactions} />}
          {page === "employees" && <EmployeesPage employees={employees} setEmployees={setEmployees} clothes={clothes} transactions={transactions} nextId={nextId} isEditor={isEditor} addAudit={addAudit} currentUser={currentUser} />}
          {page === "clothes" && <ClothesPage clothes={clothes} setClothes={setClothes} employees={employees} transactions={transactions} nextId={nextId} isEditor={isEditor} addAudit={addAudit} currentUser={currentUser} />}
          {page === "handout" && isEditor && <HandoutPage employees={employees} setEmployees={setEmployees} clothes={clothes} setClothes={setClothes} transactions={transactions} setTransactions={setTransactions} nextId={nextId} currentUser={currentUser} addAudit={addAudit} />}
          {page === "returns" && isEditor && <ReturnsPage clothes={clothes} setClothes={setClothes} transactions={transactions} setTransactions={setTransactions} employees={employees} nextId={nextId} currentUser={currentUser} addAudit={addAudit} />}
          {page === "reports" && <ReportsPage employees={employees} clothes={clothes} transactions={transactions} auditLog={auditLog} />}
        </div>
      </div>
    </div>
  );
}

// ===== LOGIN =====
function LoginScreen({ onLogin }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  const handle = () => {
    const user = USERS.find(x => x.username === u && x.password === p);
    if (user) onLogin(user); else setErr("שם משתמש או סיסמה שגויים");
  };
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1A2332 0%, #2D3E55 100%)", direction: "rtl" }}>
      <div style={{ background: "white", borderRadius: 16, padding: 40, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: "#FF6B35", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Icon name="shirt" size={28} color="white" />
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#111827" }}>WorkWear Manager</h1>
          <p style={{ margin: "4px 0 0", color: "#6B7280", fontSize: 13 }}>גרסה 2.0</p>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>שם משתמש</label>
          <input value={u} onChange={e => setU(e.target.value)} placeholder="admin / manager" style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>סיסמה</label>
          <input value={p} onChange={e => setP(e.target.value)} type="password" placeholder="סיסמה" onKeyDown={e => e.key === "Enter" && handle()} style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
        </div>
        {err && <p style={{ color: "#EF4444", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{err}</p>}
        <button onClick={handle} style={{ width: "100%", padding: "12px", background: "#FF6B35", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>כניסה</button>
        <p style={{ marginTop: 14, textAlign: "center", fontSize: 11, color: "#9CA3AF" }}>
          פרטי הכניסה מוגדרים על ידי מנהל המערכת
        </p>
      </div>
    </div>
  );
}

// ===== SCAN FEEDBACK BANNER =====
function ScanFeedback({ result, onDismiss }) {
  if (!result) return null;
  const colors = {
    success: { bg: "#D1FAE5", border: "#6EE7B7", text: "#065F46" },
    warning: { bg: "#FEF3C7", border: "#FCD34D", text: "#92400E" },
    error:   { bg: "#FEE2E2", border: "#FCA5A5", text: "#991B1B" },
    blocked: { bg: "#FEE2E2", border: "#F87171", text: "#7F1D1D" },
  };
  const c = colors[result.type] || colors.error;
  return (
    <div style={{ padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${c.border}`, background: c.bg, color: c.text, fontSize: 13, fontWeight: 600, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start", lineHeight: 1.5 }}>
      <span>{result.msg}</span>
      {onDismiss && <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", color: c.text, marginRight: 8, flexShrink: 0 }}><Icon name="x" size={14} /></button>}
    </div>
  );
}

// ===== CAMERA SCANNER (inline – no external file needed) =====
function CameraScanner({ onScan, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animRef = useRef(null);
  const lastCode = useRef("");
  const lastTime = useRef(0);
  const [status, setStatus] = useState("מאתחל מצלמה...");
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [lastScanned, setLastScanned] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } }
        });
        if (!active) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
        setStatus("מוכן – כוון לברקוד");
        animRef.current = requestAnimationFrame(scan);
      } catch (e) {
        setError(e.name === "NotAllowedError" ? "אין הרשאת מצלמה – אשר בדפדפן" : "שגיאה: " + e.message);
      }
    })();
    return () => {
      active = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const scan = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animRef.current = requestAnimationFrame(scan); return;
    }
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    // ניסיון זיהוי באמצעות BarcodeDetector (Chrome/Android מובנה)
    if (window.BarcodeDetector) {
      const detector = new window.BarcodeDetector({ formats: ["code_128","qr_code","ean_13","ean_8","code_39"] });
      detector.detect(canvas).then(results => {
        if (results.length > 0) {
          const code = results[0].rawValue;
          const now = Date.now();
          if (code !== lastCode.current || now - lastTime.current > 2000) {
            lastCode.current = code; lastTime.current = now;
            setLastScanned(code); setCount(c => c + 1);
            if (navigator.vibrate) navigator.vibrate(100);
            onScan(code);
          }
        }
      }).catch(() => {});
    }
    animRef.current = requestAnimationFrame(scan);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 2000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", direction: "rtl" }}>
      {/* header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "14px 20px", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>📷 סריקת מצלמה</span>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, padding: "7px 16px", color: "white", cursor: "pointer", fontWeight: 600 }}>סגור ✕</button>
      </div>

      {error ? (
        <div style={{ background: "#FEE2E2", color: "#991B1B", padding: 24, borderRadius: 12, maxWidth: 300, textAlign: "center", fontSize: 14 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📷</div>
          {error}
        </div>
      ) : (
        <div style={{ position: "relative", width: "min(420px,90vw)" }}>
          <video ref={videoRef} muted playsInline style={{ width: "100%", borderRadius: 12, background: "#000", display: "block" }} />
          {/* מסגרת סריקה */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <div style={{ width: "70%", height: "28%", position: "relative" }}>
              {[{top:0,right:0,borderTop:"3px solid #FF6B35",borderRight:"3px solid #FF6B35",borderRadius:"0 8px 0 0"},
                {top:0,left:0,borderTop:"3px solid #FF6B35",borderLeft:"3px solid #FF6B35",borderRadius:"8px 0 0 0"},
                {bottom:0,right:0,borderBottom:"3px solid #FF6B35",borderRight:"3px solid #FF6B35",borderRadius:"0 0 8px 0"},
                {bottom:0,left:0,borderBottom:"3px solid #FF6B35",borderLeft:"3px solid #FF6B35",borderRadius:"0 0 0 8px"}
              ].map((s,i) => <div key={i} style={{ position:"absolute", width:24, height:24, ...s }} />)}
            </div>
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}

      {/* footer */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 20px", background: "rgba(0,0,0,0.6)", textAlign: "center" }}>
        {lastScanned ? (
          <div>
            <div style={{ display: "inline-block", background: "#D1FAE5", color: "#065F46", padding: "7px 18px", borderRadius: 8, fontWeight: 700, fontFamily: "monospace", marginBottom: 4 }}>✓ {lastScanned}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>נסרקו: {count} בגדים</div>
          </div>
        ) : (
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{status}</span>
        )}
      </div>
    </div>
  );
}

// ===== SCAN INPUT BOX =====
// תומך בסורק חיצוני (HID/Enter) + כפתור מצלמה
function ScanInput({ onScan, placeholder = "סרוק ברקוד או הקלד ולחץ Enter...", autoFocus = true }) {
  const [val, setVal] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);

  const handle = () => {
    const code = val.trim();
    if (code) { onScan(code); setVal(""); setTimeout(() => ref.current?.focus(), 50); }
  };

  const handleCameraScan = (code) => {
    onScan(code);
    // המצלמה נשארת פתוחה לסריקה הבאה
  };

  return (
    <div>
      {showCamera && <CameraScanner onScan={handleCameraScan} onClose={() => { setShowCamera(false); setTimeout(() => ref.current?.focus(), 100); }} />}
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
            <Icon name="scan" size={16} color="#9CA3AF" />
          </div>
          <input ref={ref} value={val} onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handle()}
            placeholder={placeholder}
            style={{ ...inputStyle, paddingRight: 36, fontFamily: "monospace", fontSize: 14, width: "100%", boxSizing: "border-box" }} />
        </div>
        <button onClick={handle} style={btnPrimary}>
          <Icon name="scan" size={16} color="white" /> סרוק
        </button>
        <button onClick={() => setShowCamera(true)} style={{ ...btnPrimary, background: "#1A2332" }} title="פתח מצלמה">
          📷
        </button>
      </div>
    </div>
  );
}

// ===== DASHBOARD =====
function StatCard({ label, value, icon, color, sub }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{label}</p>
          <p style={{ margin: "4px 0 0", fontSize: 28, fontWeight: 800, color: "#111827" }}>{value}</p>
          {sub && <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9CA3AF" }}>{sub}</p>}
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={20} color={color} />
        </div>
      </div>
    </div>
  );
}

function Dashboard({ stats, employees, clothes, transactions }) {
  const missing = employees.filter(emp => {
    const given = transactions.filter(t => t.employeeId === emp.id && t.action === "מסירה").map(t => t.clotheId);
    const returned = transactions.filter(t => t.employeeId === emp.id && t.action === "החזרה").map(t => t.clotheId);
    return given.some(id => !returned.includes(id));
  });

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 22 }}>
        <StatCard label="עובדים פעילים" value={stats.totalEmployees} icon="employees" color="#2196F3" />
        <StatCard label="במלאי" value={stats.inStock} icon="check" color="#4CAF50" />
        <StatCard label="אצל עובדים" value={stats.withEmployees} icon="handout" color="#FF9800" />
        <StatCard label="בכביסה" value={stats.inLaundry} icon="returns" color="#9C27B0" />
        <StatCard label="תקול" value={stats.broken} icon="alert" color="#FF5722" />
        <StatCard label="אבוד" value={stats.lost} icon="warning" color="#F44336" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={card}>
          <h3 style={cardTitle}><Icon name="warning" size={15} color="#F59E0B" /> עובדים עם בגדים חסרים</h3>
          {missing.length === 0 ? (
            <div style={{ textAlign: "center", padding: 24, color: "#9CA3AF" }}>
              <Icon name="check" size={28} color="#4CAF50" /><br /><span style={{ fontSize: 12 }}>אין חוסרים</span>
            </div>
          ) : missing.slice(0, 6).map(emp => {
            const given = transactions.filter(t => t.employeeId === emp.id && t.action === "מסירה").map(t => t.clotheId);
            const returned = transactions.filter(t => t.employeeId === emp.id && t.action === "החזרה").map(t => t.clotheId);
            const cnt = given.filter(id => !returned.includes(id)).length;
            return (
              <div key={emp.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{emp.name}</div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>{emp.department}</div>
                </div>
                <span style={{ background: "#FEE2E2", color: "#EF4444", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{cnt} חסרים</span>
              </div>
            );
          })}
        </div>
        <div style={card}>
          <h3 style={cardTitle}><Icon name="history" size={15} color="#6B7280" /> תנועות אחרונות</h3>
          {[...transactions].reverse().slice(0, 7).map(t => {
            const emp = employees.find(e => e.id === t.employeeId);
            const cloth = clothes.find(c => c.id === t.clotheId);
            return (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{emp?.name}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{cloth?.barcode} · {cloth?.type}</div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <span style={{ background: t.action === "מסירה" ? "#DBEAFE" : "#D1FAE5", color: t.action === "מסירה" ? "#1D4ED8" : "#065F46", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{t.action}</span>
                  <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>{new Date(t.datetime).toLocaleDateString("he-IL")}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===== EMPLOYEES PAGE =====
function EmployeesPage({ employees, setEmployees, clothes, transactions, nextId, isEditor, addAudit, currentUser }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ employeeNum: "", name: "", department: "", phone: "", type: "permanent", status: "active" });

  const filtered = employees.filter(e => e.name.includes(search) || e.employeeNum.includes(search) || e.department.includes(search));

  const openAdd = () => { setForm({ employeeNum: "", name: "", department: "", phone: "", type: "permanent", status: "active" }); setEditing(null); setShowForm(true); };
  const openEdit = (emp) => { setForm({ ...emp }); setEditing(emp.id); setShowForm(true); };
  const save = () => {
    if (!form.name) return;
    if (editing) {
      setEmployees(prev => prev.map(e => e.id === editing ? { ...form, id: editing } : e));
      addAudit("עריכת עובד", form.name, currentUser.id);
    } else {
      const newEmp = { ...form, id: nextId(employees) };
      setEmployees(prev => [...prev, newEmp]);
      addAudit("הוספת עובד", form.name, currentUser.id);
    }
    setShowForm(false);
  };

  return (
    <div>
      {showForm && (
        <Modal title={editing ? "עריכת עובד" : "הוספת עובד"} onClose={() => setShowForm(false)} onSave={save}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="מספר עובד" value={form.employeeNum} onChange={v => setForm(p => ({...p, employeeNum: v}))} placeholder="E001" />
            <Field label="שם מלא *" value={form.name} onChange={v => setForm(p => ({...p, name: v}))} />
            <Field label="מחלקה" value={form.department} onChange={v => setForm(p => ({...p, department: v}))} />
            <Field label="טלפון" value={form.phone} onChange={v => setForm(p => ({...p, phone: v}))} />
            <SelectField label="סוג עובד" value={form.type} onChange={v => setForm(p => ({...p, type: v}))} options={[{v:"permanent",l:"קבוע"},{v:"temporary",l:"זמני"}]} />
            <SelectField label="סטטוס" value={form.status} onChange={v => setForm(p => ({...p, status: v}))} options={[{v:"active",l:"פעיל"},{v:"inactive",l:"לא פעיל"}]} />
          </div>
        </Modal>
      )}

      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="חיפוש עובד..." />
        {isEditor && <button onClick={openAdd} style={btnPrimary}><Icon name="plus" size={16} color="white" /> הוסף עובד</button>}
      </div>

      <div style={tableWrap}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["מס׳ עובד","שם מלא","מחלקה","טלפון","סוג","סטטוס","בגדים ברשותו", isEditor ? "פעולות" : ""].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, i) => {
              const withEmp = clothes.filter(c => c.status === "נמסר לעובד" && c.assignedTo === emp.id).length;
              return (
                <tr key={emp.id} style={{ background: i % 2 === 0 ? "white" : "#FAFAFA" }}>
                  <td style={tdStyle}><code style={codePill}>{emp.employeeNum}</code></td>
                  <td style={tdStyle}><strong>{emp.name}</strong></td>
                  <td style={tdStyle}>{emp.department}</td>
                  <td style={tdStyle}>{emp.phone}</td>
                  <td style={tdStyle}><Pill bg={emp.type === "permanent" ? "#E0E7FF" : "#FEF3C7"} text={emp.type === "permanent" ? "#3730A3" : "#92400E"}>{emp.type === "permanent" ? "קבוע" : "זמני"}</Pill></td>
                  <td style={tdStyle}><Pill bg={emp.status === "active" ? "#D1FAE5" : "#F3F4F6"} text={emp.status === "active" ? "#065F46" : "#6B7280"}>{emp.status === "active" ? "פעיל" : "לא פעיל"}</Pill></td>
                  <td style={tdStyle}>{withEmp > 0 ? <Pill bg="#DBEAFE" text="#1D4ED8">{withEmp} בגדים</Pill> : <span style={{ color: "#9CA3AF" }}>–</span>}</td>
                  {isEditor && <td style={tdStyle}><button onClick={() => openEdit(emp)} style={iconBtn}><Icon name="edit" size={14} color="#6B7280" /></button></td>}
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <Empty text="לא נמצאו עובדים" />}
      </div>
    </div>
  );
}

// ===== CLOTHES PAGE =====
function ClothesPage({ clothes, setClothes, employees, transactions, nextId, isEditor, addAudit, currentUser }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("הכל");
  const [filterStatus, setFilterStatus] = useState("הכל");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showHistory, setShowHistory] = useState(null);
  const [form, setForm] = useState({ barcode: "", type: "חולצה", size: "", color: "", purchaseDate: "", washCount: 0, status: "במלאי", assignedTo: null });

  const filtered = clothes.filter(c => {
    const ms = c.barcode.includes(search) || c.type.includes(search) || c.color.includes(search);
    const mt = filterType === "הכל" || c.type === filterType;
    const mst = filterStatus === "הכל" || c.status === filterStatus;
    return ms && mt && mst;
  });

  const genBarcode = () => {
    const prefix = form.type === "חולצה" ? "SH" : form.type === "מכנס" ? "PA" : form.type === "מעיל" ? "JA" : "IT";
    setForm(p => ({...p, barcode: prefix + String(clothes.length + 1).padStart(6, "0")}));
  };

  const save = () => {
    if (!form.barcode) return;
    // בדיקת ברקוד כפול
    const dup = clothes.find(c => c.barcode === form.barcode && c.id !== editing);
    if (dup) { alert("ברקוד זה כבר קיים במערכת!"); return; }
    if (editing) {
      setClothes(prev => prev.map(c => c.id === editing ? {...form, id: editing} : c));
      addAudit("עריכת בגד", form.barcode, currentUser.id);
    } else {
      setClothes(prev => [...prev, {...form, id: nextId(prev), assignedTo: null}]);
      addAudit("הוספת בגד", form.barcode, currentUser.id);
    }
    setShowForm(false);
  };

  return (
    <div>
      {showForm && (
        <Modal title={editing ? "עריכת בגד" : "הוספת בגד"} onClose={() => setShowForm(false)} onSave={save}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={labelStyle}>ברקוד ייחודי *</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={form.barcode} onChange={e => setForm(p => ({...p, barcode: e.target.value}))} style={{ ...inputStyle, flex: 1 }} placeholder="SH000001" readOnly={!!editing} />
                {!editing && <button onClick={genBarcode} style={{ ...btnSecondary, padding: "8px 12px" }} title="יצירה אוטומטית">⚡</button>}
              </div>
              {editing && <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>הברקוד אינו ניתן לשינוי</div>}
            </div>
            <SelectField label="סוג בגד" value={form.type} onChange={v => setForm(p => ({...p, type: v}))} options={CLOTHING_TYPES.map(t => ({v:t,l:t}))} />
            <Field label="מידה" value={form.size} onChange={v => setForm(p => ({...p, size: v}))} placeholder="L / 32 / XL" />
            <Field label="צבע" value={form.color} onChange={v => setForm(p => ({...p, color: v}))} placeholder="כחול" />
            <Field label="תאריך רכישה" value={form.purchaseDate} onChange={v => setForm(p => ({...p, purchaseDate: v}))} type="date" />
            <SelectField label="סטטוס" value={form.status} onChange={v => setForm(p => ({...p, status: v}))} options={VALID_STATUS.map(s => ({v:s,l:s}))} />
          </div>
          {editing && (
            <div style={{ marginTop: 14, padding: "10px 14px", background: "#FEF3C7", borderRadius: 8, fontSize: 12, color: "#92400E" }}>
              ⚠️ שינוי ידני של סטטוס נרשם ביומן המערכת
            </div>
          )}
        </Modal>
      )}

      {showHistory && (
        <ClothHistory cloth={showHistory} transactions={transactions} employees={employees} onClose={() => setShowHistory(null)} />
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="ברקוד, סוג, צבע..." />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={selectInput}>
          {["הכל", ...CLOTHING_TYPES].map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectInput}>
          {["הכל", ...VALID_STATUS].map(s => <option key={s}>{s}</option>)}
        </select>
        {isEditor && <button onClick={() => { setForm({ barcode: "", type: "חולצה", size: "", color: "", purchaseDate: new Date().toISOString().split("T")[0], washCount: 0, status: "במלאי", assignedTo: null }); setEditing(null); setShowForm(true); }} style={btnPrimary}><Icon name="plus" size={16} color="white" /> הוסף בגד</button>}
      </div>

      <div style={tableWrap}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["ברקוד","סוג","מידה","צבע","כביסות","סטטוס","עובד נוכחי","פעולות"].map(h => <th key={h} style={thStyle}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const currentEmp = c.assignedTo ? employees.find(e => e.id === c.assignedTo) : null;
              const sc = STATUS_COLORS[c.status] || {};
              return (
                <tr key={c.id} style={{ background: i % 2 === 0 ? "white" : "#FAFAFA" }}>
                  <td style={tdStyle}><code style={codePill}>{c.barcode}</code></td>
                  <td style={tdStyle}><strong>{c.type}</strong></td>
                  <td style={tdStyle}>{c.size}</td>
                  <td style={tdStyle}>{c.color}</td>
                  <td style={tdStyle}>{c.washCount}</td>
                  <td style={tdStyle}><Pill bg={sc.bg} text={sc.text}>{c.status}</Pill></td>
                  <td style={tdStyle}>{currentEmp ? <span style={{ fontSize: 12 }}>{currentEmp.name}</span> : <span style={{ color: "#9CA3AF" }}>–</span>}</td>
                  <td style={tdStyle}>
                    <button onClick={() => setShowHistory(c)} style={iconBtn} title="היסטוריה"><Icon name="history" size={14} color="#6B7280" /></button>
                    {isEditor && <button onClick={() => { setForm({...c}); setEditing(c.id); setShowForm(true); }} style={iconBtn}><Icon name="edit" size={14} color="#6B7280" /></button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <Empty text="לא נמצאו בגדים" />}
      </div>
    </div>
  );
}

function ClothHistory({ cloth, transactions, employees, onClose }) {
  const history = transactions.filter(t => t.clotheId === cloth.id).sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "white", borderRadius: 14, padding: 28, width: 500, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "80vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>היסטוריית בגד</h2>
            <code style={{ fontSize: 13, color: "#6366F1" }}>{cloth.barcode}</code>
            <span style={{ fontSize: 12, color: "#6B7280", marginRight: 8 }}>{cloth.type} {cloth.size} {cloth.color}</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="x" size={20} color="#6B7280" /></button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {history.length === 0 && <Empty text="אין תנועות" />}
          {history.map((t, i) => {
            const emp = employees.find(e => e.id === t.employeeId);
            return (
              <div key={t.id} style={{ display: "flex", gap: 14, padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.action === "מסירה" ? "#DBEAFE" : "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={t.action === "מסירה" ? "handout" : "returns"} size={16} color={t.action === "מסירה" ? "#1D4ED8" : "#065F46"} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.action} – {emp?.name || "לא ידוע"}</div>
                  {t.note && <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>הערה: {t.note}</div>}
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{new Date(t.datetime).toLocaleString("he-IL")}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===== HANDOUT PAGE =====
function HandoutPage({ employees, setEmployees, clothes, setClothes, transactions, setTransactions, nextId, currentUser, addAudit }) {
  const [step, setStep] = useState(1);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [empSearch, setEmpSearch] = useState("");
  const [scannedClothes, setScannedClothes] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [showNewEmp, setShowNewEmp] = useState(false);
  const [newEmpForm, setNewEmpForm] = useState({ name: "", phone: "", company: "" });
  const [done, setDone] = useState(false);

  const filteredEmps = employees.filter(e => e.status === "active" && (e.name.includes(empSearch) || e.employeeNum.includes(empSearch)));

  const handleScan = (barcode) => {
    // בדיקת כפילות בסשן הנוכחי
    if (scannedClothes.find(c => c.barcode === barcode)) {
      setLastResult({ type: "warning", msg: `ברקוד ${barcode} כבר נסרק בסשן זה` });
      return;
    }
    const result = validateScan(barcode, clothes, employees, transactions, "handout");
    setLastResult(result);
    if (result.ok) setScannedClothes(prev => [...prev, result.cloth]);
  };

  const addTempEmployee = () => {
    if (!newEmpForm.name) return;
    const emp = { id: nextId(employees), employeeNum: "T" + String(Date.now()).slice(-4), name: newEmpForm.name, department: newEmpForm.company || "", phone: newEmpForm.phone, type: "temporary", status: "active" };
    setEmployees(prev => [...prev, emp]);
    setSelectedEmp(emp);
    setShowNewEmp(false);
    setStep(2);
  };

  const confirmHandout = () => {
    const now = new Date().toISOString();
    const newTx = scannedClothes.map((c, i) => ({
      id: nextId(transactions) + i, datetime: now, employeeId: selectedEmp.id, clotheId: c.id, action: "מסירה", userId: currentUser.id, note: ""
    }));
    setTransactions(prev => [...prev, ...newTx]);
    setClothes(prev => prev.map(c => {
      const sc = scannedClothes.find(x => x.id === c.id);
      return sc ? { ...c, status: "נמסר לעובד", assignedTo: selectedEmp.id } : c;
    }));
    addAudit("מסירת בגדים", `${scannedClothes.length} בגדים ל${selectedEmp.name}`, currentUser.id);
    setDone(true);
  };

  const reset = () => { setStep(1); setSelectedEmp(null); setScannedClothes([]); setLastResult(null); setDone(false); setEmpSearch(""); };

  if (done) return (
    <div style={{ maxWidth: 520, margin: "0 auto", ...card, textAlign: "center", padding: 40 }}>
      <div style={{ width: 64, height: 64, background: "#D1FAE5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <Icon name="check" size={32} color="#10B981" />
      </div>
      <h2 style={{ margin: "0 0 8px" }}>המסירה בוצעה בהצלחה!</h2>
      <p style={{ color: "#6B7280", margin: "0 0 24px" }}>{scannedClothes.length} בגדים נמסרו ל{selectedEmp.name}</p>
      <button onClick={reset} style={btnPrimary}>+ מסירה חדשה</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* Steps */}
      <div style={{ display: "flex", marginBottom: 24, background: "white", borderRadius: 12, padding: 4, border: "1px solid #E5E7EB" }}>
        {[["1","בחירת עובד"],["2","סריקת בגדים"],["3","אישור מסירה"]].map(([n, l]) => (
          <div key={n} style={{ flex: 1, textAlign: "center", padding: "10px", borderRadius: 8, background: step >= +n ? "#FF6B35" : "transparent", color: step >= +n ? "white" : "#9CA3AF", fontSize: 13, fontWeight: step >= +n ? 700 : 400, transition: "all 0.2s" }}>
            <strong>{n}.</strong> {l}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={card}>
          <h3 style={cardTitle}>בחר עובד</h3>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <SearchBar value={empSearch} onChange={setEmpSearch} placeholder="חיפוש..." />
            <button onClick={() => setShowNewEmp(true)} style={btnSecondary}><Icon name="plus" size={15} color="#6366F1" /> עובד זמני</button>
          </div>
          {showNewEmp && (
            <div style={{ background: "#F9FAFB", borderRadius: 10, padding: 14, marginBottom: 14, border: "1px solid #E5E7EB" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <Field label="שם מלא *" value={newEmpForm.name} onChange={v => setNewEmpForm(p => ({...p, name: v}))} />
                <Field label="טלפון" value={newEmpForm.phone} onChange={v => setNewEmpForm(p => ({...p, phone: v}))} />
                <Field label="חברה קבלנית" value={newEmpForm.company} onChange={v => setNewEmpForm(p => ({...p, company: v}))} />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button onClick={addTempEmployee} style={{ ...btnPrimary, background: "#10B981" }}>צור ובחר</button>
                <button onClick={() => setShowNewEmp(false)} style={btnSecondary}>ביטול</button>
              </div>
            </div>
          )}
          <div style={{ maxHeight: 340, overflowY: "auto" }}>
            {filteredEmps.map(emp => (
              <button key={emp.id} onClick={() => { setSelectedEmp(emp); setStep(2); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "13px 14px", background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 10, marginBottom: 7, cursor: "pointer", textAlign: "right" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{emp.name}</div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>{emp.employeeNum} · {emp.department}</div>
                </div>
                <Pill bg={emp.type === "permanent" ? "#E0E7FF" : "#FEF3C7"} text={emp.type === "permanent" ? "#3730A3" : "#92400E"}>{emp.type === "permanent" ? "קבוע" : "זמני"}</Pill>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>סריקת בגדים</h3>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "#6B7280" }}>לעובד: <strong>{selectedEmp.name}</strong></p>
            </div>
            <button onClick={() => setStep(1)} style={{ ...btnSecondary, fontSize: 12 }}>← שנה עובד</button>
          </div>

          <div style={{ marginBottom: 14 }}>
            <ScanInput onScan={handleScan} />
            <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>תומך בסורק ברקוד חיצוני (HID) ובמצלמה</div>
          </div>

          {lastResult && <ScanFeedback result={lastResult} onDismiss={() => setLastResult(null)} />}

          <div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 14 }}>
            {scannedClothes.length === 0 && <div style={{ textAlign: "center", padding: 24, color: "#9CA3AF", fontSize: 12 }}>טרם נסרקו בגדים</div>}
            {scannedClothes.map(c => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 13 }}><strong>{c.type}</strong> {c.size} · {c.color}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <code style={{ fontSize: 12, color: "#065F46", background: "#BBF7D0", padding: "2px 8px", borderRadius: 4 }}>{c.barcode}</code>
                  <button onClick={() => setScannedClothes(prev => prev.filter(x => x.id !== c.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}><Icon name="x" size={14} /></button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#6B7280" }}>נסרקו: <strong>{scannedClothes.length}</strong> בגדים</span>
            {scannedClothes.length > 0 && (
              <button onClick={() => setStep(3)} style={btnPrimary}>המשך לאישור →</button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={card}>
          <h3 style={cardTitle}>אישור מסירה</h3>
          <div style={{ padding: "12px 14px", background: "#F9FAFB", borderRadius: 8, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>עובד: {selectedEmp.name}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{selectedEmp.employeeNum} · {selectedEmp.department}</div>
          </div>
          {scannedClothes.map(c => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid #F3F4F6" }}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{c.type} – {c.size} – {c.color}</span>
              <code style={{ fontSize: 12, color: "#6366F1" }}>{c.barcode}</code>
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button onClick={confirmHandout} style={{ ...btnPrimary, flex: 1, justifyContent: "center", padding: 13, background: "#10B981" }}>
              <Icon name="check" size={18} color="white" /> אשר מסירה ({scannedClothes.length} בגדים)
            </button>
            <button onClick={() => setStep(2)} style={btnSecondary}>← חזור</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== RETURNS PAGE =====
function ReturnsPage({ clothes, setClothes, transactions, setTransactions, employees, nextId, currentUser, addAudit }) {
  const [scannedReturns, setScannedReturns] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [sessionDone, setSessionDone] = useState(false);

  const handleScan = (barcode) => {
    if (scannedReturns.find(c => c.barcode === barcode)) {
      setLastResult({ type: "warning", msg: `ברקוד ${barcode} כבר נסרק בסשן זה` });
      return;
    }
    const result = validateScan(barcode, clothes, employees, transactions, "returns");
    setLastResult(result);
    if (result.ok) setScannedReturns(prev => [...prev, { ...result.cloth, employeeName: result.employee?.name || "לא ידוע" }]);
  };

  const finishSession = () => {
    const now = new Date().toISOString();
    const newTx = scannedReturns.map((c, i) => ({
      id: nextId(transactions) + i, datetime: now,
      employeeId: c.assignedTo, clotheId: c.id, action: "החזרה", userId: currentUser.id, note: ""
    }));
    setTransactions(prev => [...prev, ...newTx]);
    setClothes(prev => prev.map(c => {
      const r = scannedReturns.find(x => x.id === c.id);
      return r ? { ...c, status: "בכביסה", assignedTo: null, washCount: c.washCount + 1 } : c;
    }));
    addAudit("החזרת בגדים", `${scannedReturns.length} בגדים הוחזרו`, currentUser.id);
    setSessionDone(true);
  };

  const missing = employees.filter(emp => {
    return clothes.some(c => c.status === "נמסר לעובד" && c.assignedTo === emp.id);
  }).map(emp => ({
    emp, items: clothes.filter(c => c.status === "נמסר לעובד" && c.assignedTo === emp.id)
  }));

  const reset = () => { setScannedReturns([]); setLastResult(null); setSessionDone(false); };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      {sessionDone ? (
        <div style={{ ...card, textAlign: "center", padding: 40 }}>
          <div style={{ width: 64, height: 64, background: "#D1FAE5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name="check" size={32} color="#10B981" />
          </div>
          <h2 style={{ margin: "0 0 8px" }}>סיום סשן החזרות</h2>
          <p style={{ color: "#6B7280", margin: "0 0 24px" }}>{scannedReturns.length} בגדים עברו לסטטוס "בכביסה"</p>
          <button onClick={reset} style={btnPrimary}>+ סשן חדש</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* סריקה */}
          <div style={card}>
            <h3 style={cardTitle}><Icon name="scan" size={15} color="#FF6B35" /> סריקת בגדים מהסל</h3>
            <div style={{ marginBottom: 12 }}>
              <ScanInput onScan={handleScan} />
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 5 }}>המצלמה/סורק פעיל – סרוק ברצף</div>
            </div>
            {lastResult && <ScanFeedback result={lastResult} onDismiss={() => setLastResult(null)} />}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>נסרקו: {scannedReturns.length} בגדים</span>
            </div>
            <div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 12 }}>
              {scannedReturns.length === 0 && <div style={{ textAlign: "center", padding: 24, color: "#9CA3AF", fontSize: 12 }}>ממתין לסריקה...</div>}
              {scannedReturns.map(c => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 10px", background: "#F0FDF4", borderRadius: 6, marginBottom: 4, fontSize: 12 }}>
                  <span><strong>{c.type}</strong> {c.size} – {c.employeeName}</span>
                  <code style={{ color: "#065F46", fontSize: 11 }}>{c.barcode}</code>
                </div>
              ))}
            </div>
            {scannedReturns.length > 0 && (
              <button onClick={finishSession} style={{ ...btnPrimary, background: "#10B981", width: "100%", justifyContent: "center", padding: 12 }}>
                <Icon name="check" size={16} color="white" /> סיים סשן וסגור
              </button>
            )}
          </div>

          {/* חוסרים */}
          <div style={card}>
            <h3 style={cardTitle}><Icon name="alert" size={15} color="#F59E0B" /> בגדים שלא הוחזרו ({missing.reduce((s, x) => s + x.items.length, 0)})</h3>
            <div style={{ maxHeight: 380, overflowY: "auto" }}>
              {missing.length === 0 && <div style={{ textAlign: "center", padding: 24, color: "#9CA3AF", fontSize: 12 }}>אין חוסרים</div>}
              {missing.map(({ emp, items }) => (
                <div key={emp.id} style={{ marginBottom: 10, padding: 12, background: "#FEF2F2", borderRadius: 8, border: "1px solid #FECACA" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#991B1B", marginBottom: 5 }}>{emp.name}</div>
                  {items.map(c => (
                    <div key={c.id} style={{ fontSize: 11, color: "#7F1D1D", display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <span>{c.type} {c.size} {c.color}</span>
                      <code style={{ fontSize: 11 }}>{c.barcode}</code>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== REPORTS =====
function ReportsPage({ employees, clothes, transactions, auditLog }) {
  const [tab, setTab] = useState("daily");

  const totalHandouts = transactions.filter(t => t.action === "מסירה").length;
  const totalReturns = transactions.filter(t => t.action === "החזרה").length;
  const returnRate = totalHandouts > 0 ? Math.round((totalReturns / totalHandouts) * 100) : 0;

  const missing = employees.map(emp => {
    const items = clothes.filter(c => c.status === "נמסר לעובד" && c.assignedTo === emp.id);
    return { emp, items };
  }).filter(x => x.items.length > 0);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["daily","דוח יומי"],["inventory","מלאי"],["employee","לפי עובד"],["history","היסטוריה"],["audit","יומן מערכת"]].map(([id, l]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: "8px 16px", borderRadius: 8, border: "1.5px solid", cursor: "pointer", fontSize: 13, fontWeight: 600, background: tab === id ? "#FF6B35" : "white", borderColor: tab === id ? "#FF6B35" : "#E5E7EB", color: tab === id ? "white" : "#374151" }}>{l}</button>
        ))}
      </div>

      {tab === "daily" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 18 }}>
            <StatCard2 label="סה״כ מסירות" value={totalHandouts} color="#2196F3" />
            <StatCard2 label="סה״כ החזרות" value={totalReturns} color="#4CAF50" />
            <StatCard2 label="אחוז החזרות" value={returnRate + "%"} color={returnRate >= 80 ? "#4CAF50" : "#FF9800"} />
          </div>
          <div style={card}>
            <h3 style={{ ...cardTitle, color: "#991B1B" }}>עובדים עם חוסרים ({missing.length})</h3>
            {missing.length === 0 ? <Empty text="אין חוסרים – כל הבגדים הוחזרו" /> : (
              <table style={tableStyle}>
                <thead><tr style={{ background: "#FEF2F2" }}>{["עובד","מחלקה","סוג בגד","ברקוד"].map(h => <th key={h} style={{ ...thStyle, color: "#991B1B" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {missing.flatMap(({ emp, items }) => items.map((c, i) => (
                    <tr key={c.id}>
                      <td style={tdStyle}>{i === 0 ? <strong>{emp.name}</strong> : ""}</td>
                      <td style={tdStyle}>{i === 0 ? emp.department : ""}</td>
                      <td style={tdStyle}>{c.type} {c.size}</td>
                      <td style={tdStyle}><code style={codePill}>{c.barcode}</code></td>
                    </tr>
                  )))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {tab === "inventory" && (
        <div style={card}>
          <h3 style={cardTitle}>מלאי לפי סטטוס</h3>
          {VALID_STATUS.map(status => {
            const cnt = clothes.filter(c => c.status === status).length;
            const sc = STATUS_COLORS[status] || {};
            return (
              <div key={status} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: sc.dot }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{status}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 100, height: 6, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${clothes.length ? (cnt / clothes.length) * 100 : 0}%`, height: "100%", background: sc.dot, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontWeight: 700, minWidth: 28, textAlign: "center" }}>{cnt}</span>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 12, fontSize: 12, color: "#6B7280", textAlign: "left" }}>סה״כ: {clothes.length} פריטים</div>
        </div>
      )}

      {tab === "employee" && <EmployeeReport employees={employees} clothes={clothes} transactions={transactions} />}

      {tab === "history" && (
        <div style={tableWrap}>
          <table style={tableStyle}>
            <thead><tr style={{ background: "#F9FAFB" }}>{["תאריך ושעה","עובד","ברקוד","סוג","פעולה"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
            <tbody>
              {[...transactions].reverse().map((t, i) => {
                const emp = employees.find(e => e.id === t.employeeId);
                const cloth = clothes.find(c => c.id === t.clotheId);
                return (
                  <tr key={t.id} style={{ background: i % 2 === 0 ? "white" : "#FAFAFA" }}>
                    <td style={tdStyle}><span style={{ fontSize: 11, color: "#6B7280" }}>{new Date(t.datetime).toLocaleString("he-IL")}</span></td>
                    <td style={tdStyle}><strong>{emp?.name || "–"}</strong></td>
                    <td style={tdStyle}><code style={codePill}>{cloth?.barcode}</code></td>
                    <td style={tdStyle}>{cloth?.type}</td>
                    <td style={tdStyle}><Pill bg={t.action === "מסירה" ? "#DBEAFE" : "#D1FAE5"} text={t.action === "מסירה" ? "#1D4ED8" : "#065F46"}>{t.action}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {transactions.length === 0 && <Empty text="אין תנועות" />}
        </div>
      )}

      {tab === "audit" && (
        <div style={card}>
          <h3 style={cardTitle}><Icon name="shield" size={15} color="#6B7280" /> יומן מערכת (Audit Log)</h3>
          {auditLog.length === 0 ? <Empty text="אין רשומות ביומן" /> : (
            <div style={{ maxHeight: 500, overflowY: "auto" }}>
              {[...auditLog].reverse().map(a => (
                <div key={a.id} style={{ display: "flex", gap: 14, padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <div style={{ fontSize: 11, color: "#9CA3AF", minWidth: 110 }}>{new Date(a.datetime).toLocaleString("he-IL")}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{a.action}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{a.detail} · משתמש: {a.userId}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatCard2({ label, value, color }) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: 18, border: "1px solid #F3F4F6", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", textAlign: "center" }}>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function EmployeeReport({ employees, clothes, transactions }) {
  const [selectedId, setSelectedId] = useState("");
  const emp = employees.find(e => e.id === +selectedId);
  const empTx = emp ? transactions.filter(t => t.employeeId === emp.id) : [];
  const currentItems = emp ? clothes.filter(c => c.status === "נמסר לעובד" && c.assignedTo === emp.id) : [];

  // חישוב יחס החזרות לפי סוג בגד
  const returnStats = emp ? (() => {
    const handouts = transactions.filter(t => t.employeeId === emp.id && t.action === "מסירה");
    const returns = transactions.filter(t => t.employeeId === emp.id && t.action === "החזרה");
    // קיבוץ לפי סוג בגד
    const byType = {};
    handouts.forEach(t => {
      const c = clothes.find(x => x.id === t.clotheId);
      if (!c) return;
      if (!byType[c.type]) byType[c.type] = { given: 0, returned: 0, items: [] };
      byType[c.type].given++;
      const wasReturned = returns.some(r => r.clotheId === t.clotheId);
      if (wasReturned) byType[c.type].returned++;
      byType[c.type].items.push({ ...c, wasReturned });
    });
    return byType;
  })() : {};

  const totalGiven = Object.values(returnStats).reduce((s, x) => s + x.given, 0);
  const totalReturned = Object.values(returnStats).reduce((s, x) => s + x.returned, 0);
  const returnPct = totalGiven > 0 ? Math.round((totalReturned / totalGiven) * 100) : 0;

  return (
    <div>
      <div style={{ ...card, marginBottom: 14 }}>
        <label style={labelStyle}>בחר עובד</label>
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)} style={{ ...selectInput, width: "100%", padding: "10px 14px" }}>
          <option value="">-- בחר עובד --</option>
          {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.employeeNum})</option>)}
        </select>
      </div>

      {emp && (
        <div>
          {/* כרטיס פרטים + סטטיסטיקה */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div style={card}>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10, fontWeight: 600 }}>פרטי עובד</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["שם", emp.name], ["מחלקה", emp.department || "–"], ["מספר", emp.employeeNum], ["סוג", emp.type === "permanent" ? "קבוע" : "זמני"]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: 10, color: "#9CA3AF" }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13 }}>{v}</div></div>
                ))}
              </div>
            </div>

            <div style={card}>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10, fontWeight: 600 }}>סיכום החזרות</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: returnPct >= 80 ? "#10B981" : returnPct >= 50 ? "#F59E0B" : "#EF4444" }}>{returnPct}%</div>
                  <div style={{ fontSize: 10, color: "#9CA3AF" }}>אחוז החזרה</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: "#6B7280" }}>הוחזרו</span>
                    <span style={{ fontWeight: 700 }}>{totalReturned} מתוך {totalGiven}</span>
                  </div>
                  <div style={{ height: 8, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${returnPct}%`, height: "100%", background: returnPct >= 80 ? "#10B981" : returnPct >= 50 ? "#F59E0B" : "#EF4444", borderRadius: 4, transition: "width 0.5s" }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>ברשותו כעת: {currentItems.length} בגדים</div>
                </div>
              </div>
            </div>
          </div>

          {/* טבלת החזרות לפי סוג בגד */}
          {Object.keys(returnStats).length > 0 && (
            <div style={{ ...card, marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>פירוט לפי סוג בגד</div>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ background: "#F9FAFB" }}>
                    {["סוג בגד", "נמסרו", "הוחזרו", "חסרים", "יחס החזרה"].map(h => <th key={h} style={thStyle}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(returnStats).map(([type, data], i) => {
                    const missing = data.given - data.returned;
                    const pct = Math.round((data.returned / data.given) * 100);
                    return (
                      <tr key={type} style={{ background: i % 2 === 0 ? "white" : "#FAFAFA" }}>
                        <td style={tdStyle}><strong>{type}</strong></td>
                        <td style={tdStyle}>{data.given}</td>
                        <td style={tdStyle}>
                          <span style={{ color: "#065F46", fontWeight: 600 }}>{data.returned}</span>
                          <span style={{ color: "#9CA3AF", fontSize: 11 }}> מתוך {data.given}</span>
                        </td>
                        <td style={tdStyle}>
                          {missing > 0
                            ? <Pill bg="#FEE2E2" text="#991B1B">{missing} חסרים</Pill>
                            : <Pill bg="#D1FAE5" text="#065F46">הכל הוחזר ✓</Pill>}
                        </td>
                        <td style={{ ...tdStyle, minWidth: 140 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ flex: 1, height: 6, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444", borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, minWidth: 36, color: pct === 100 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444" }}>{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* בגדים ברשותו כעת */}
          {currentItems.length > 0 && (
            <div style={{ ...card, marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "#1D4ED8" }}>בגדים ברשותו כעת ({currentItems.length})</div>
              {currentItems.map(c => (
                <div key={c.id} style={{ fontSize: 12, padding: "7px 12px", background: "#EFF6FF", borderRadius: 6, marginBottom: 5, display: "flex", justifyContent: "space-between" }}>
                  <span>{c.type} {c.size} {c.color}</span>
                  <code style={{ fontSize: 11, color: "#1D4ED8" }}>{c.barcode}</code>
                </div>
              ))}
            </div>
          )}

          {/* היסטוריית תנועות */}
          <div style={card}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>היסטוריית תנועות</div>
            <table style={tableStyle}>
              <thead><tr style={{ background: "#F9FAFB" }}>{["תאריך","ברקוד","סוג","פעולה"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
              <tbody>
                {[...empTx].reverse().map((t, i) => {
                  const c = clothes.find(x => x.id === t.clotheId);
                  return (
                    <tr key={t.id} style={{ background: i % 2 === 0 ? "white" : "#FAFAFA" }}>
                      <td style={tdStyle}><span style={{ fontSize: 11, color: "#6B7280" }}>{new Date(t.datetime).toLocaleString("he-IL")}</span></td>
                      <td style={tdStyle}><code style={{ fontSize: 11 }}>{c?.barcode}</code></td>
                      <td style={tdStyle}>{c?.type}</td>
                      <td style={tdStyle}><Pill bg={t.action === "מסירה" ? "#DBEAFE" : "#D1FAE5"} text={t.action === "מסירה" ? "#1D4ED8" : "#065F46"}>{t.action}</Pill></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {empTx.length === 0 && <Empty text="אין תנועות" />}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== SHARED UI =====
function Modal({ title, onClose, onSave, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "white", borderRadius: 14, padding: 28, width: 520, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="x" size={20} color="#6B7280" /></button>
        </div>
        {children}
        <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid #E5E7EB", background: "white", cursor: "pointer", fontSize: 13 }}>ביטול</button>
          <button onClick={onSave} style={{ ...btnPrimary, padding: "8px 20px" }}>שמור</button>
        </div>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative", flex: 1 }}>
      <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}><Icon name="search" size={15} color="#9CA3AF" /></div>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...inputStyle, paddingRight: 34, width: "100%", boxSizing: "border-box" }} />
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type} style={inputStyle} />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
}

function Pill({ bg, text, children }) {
  return <span style={{ background: bg, color: text, padding: "2px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{children}</span>;
}

function Empty({ text }) {
  return <div style={{ padding: "28px 0", textAlign: "center", color: "#9CA3AF", fontSize: 13 }}>{text}</div>;
}

// ===== STYLE TOKENS =====
const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 };
const inputStyle = { width: "100%", padding: "9px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 13, outline: "none", background: "white", boxSizing: "border-box" };
const selectInput = { padding: "9px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 13, outline: "none", background: "white", cursor: "pointer" };
const btnPrimary = { display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "#FF6B35", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" };
const btnSecondary = { display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", background: "white", color: "#374151", border: "1.5px solid #E5E7EB", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 };
const iconBtn = { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 6, padding: "5px 8px", cursor: "pointer", marginLeft: 4 };
const thStyle = { padding: "11px 14px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "#6B7280", borderBottom: "1px solid #E5E7EB" };
const tdStyle = { padding: "11px 14px", fontSize: 13, color: "#374151", borderBottom: "1px solid #F3F4F6" };
const tableStyle = { width: "100%", borderCollapse: "collapse" };
const tableWrap = { background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" };
const card = { background: "white", borderRadius: 12, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" };
const cardTitle = { margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 7 };
const codePill = { fontFamily: "monospace", fontSize: 12, background: "#F3F4F6", padding: "2px 7px", borderRadius: 4 };
