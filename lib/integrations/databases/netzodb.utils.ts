import { _get } from "../../deps/lodash.get.ts";
import { monotonicFactory } from "../../deps/ulid.ts";

export const ulid = monotonicFactory();

export function filterObjectsByKeyValues<T = unknown>(
  data: T[],
  filters: Record<string, any> = {},
) {
  // filter item out if any of the filters fail, otherwise keep it
  return !Object.keys(filters).length ? data : data.filter((item) => {
    return !Object.entries(filters).some(([key, value]) => {
      const itemValue = _get(item, key, "").toString();
      return itemValue?.toLowerCase() !== value?.toLowerCase(); // case insensitive
    });
  });
}

// export function filterObjectsByKeyValuesWithQ<T = unknown>(
//   data: T[],
//   query: Record<string, any> = {},
// ) {
//   const { q, ...otherParams } = query;

//   let filteredData = data;

//   console.log(typeof q, q);

//   const Q = getQuery("http://foo.com/foo?q={$limit:2}");
//   console.log(typeof Q, Q);
//   console.log(JSON.parse(Q.q));

//   // Process special query parameters
//   if (q) {
//     try {
//       // fix the following error: "SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)" error:
//       const parsedQuery = JSON.parse(JSON.stringify(q));
//       console.log(typeof parsedQuery, parsedQuery);
//       filteredData = applyMongoDBQuery(filteredData, parsedQuery);
//     } catch (error) {
//       console.error("Error parsing MongoDB query:", error);
//     }
//   }

//   // Process normal equality parameters
//   Object.entries(otherParams).forEach(([key, value]) => {
//     filteredData = filteredData.filter((item) => {
//       const itemValue = _get(item, key, "").toString();
//       return itemValue.toLowerCase() === value.toLowerCase(); // case insensitive equality
//     });
//   });

//   return filteredData;
// }

// function applyMongoDBQuery<T>(
//   data: T[],
//   query: Record<string, any>,
// ): T[] {
//   const { $limit, $skip, $sort, $select, $or, $and, ...conditions } = query;

//   let filteredData = data;

//   // Filter data based on MongoDB query conditions
//   Object.entries(conditions).forEach(([key, value]) => {
//     filteredData = filteredData.filter((item) => {
//       const itemValue = _get(item, key, "").toString();
//       if (typeof value === "object" && !Array.isArray(value)) {
//         const operator = Object.keys(value)[0];
//         const operand = value[operator];
//         switch (operator) {
//           case "$in":
//             return operand.includes(itemValue.toLowerCase());
//           case "$nin":
//             return !operand.includes(itemValue.toLowerCase());
//           case "$lt":
//             return itemValue.toLowerCase() < operand.toLowerCase();
//           case "$lte":
//             return itemValue.toLowerCase() <= operand.toLowerCase();
//           case "$gt":
//             return itemValue.toLowerCase() > operand.toLowerCase();
//           case "$gte":
//             return itemValue.toLowerCase() >= operand.toLowerCase();
//           case "$ne":
//             return itemValue.toLowerCase() !== operand.toLowerCase();
//           default:
//             return true; // unsupported operator, keep the item
//         }
//       } else {
//         return itemValue.toLowerCase() === value.toLowerCase(); // case insensitive equality
//       }
//     });
//   });

//   // Handle $or operator
//   if ($or) {
//     const orConditions = Array.isArray($or) ? $or : [$or];
//     filteredData = filteredData.filter((item) =>
//       orConditions.some((condition: Record<string, any>) =>
//         Object.entries(condition).every(([key, value]) => {
//           const itemValue = _get(item, key, "").toString();
//           if (typeof value === "object" && !Array.isArray(value)) {
//             const operator = Object.keys(value)[0];
//             const operand = value[operator];
//             switch (operator) {
//               case "$in":
//                 return operand.includes(itemValue.toLowerCase());
//               case "$nin":
//                 return !operand.includes(itemValue.toLowerCase());
//               case "$lt":
//                 return itemValue.toLowerCase() < operand.toLowerCase();
//               case "$lte":
//                 return itemValue.toLowerCase() <= operand.toLowerCase();
//               case "$gt":
//                 return itemValue.toLowerCase() > operand.toLowerCase();
//               case "$gte":
//                 return itemValue.toLowerCase() >= operand.toLowerCase();
//               case "$ne":
//                 return itemValue.toLowerCase() !== operand.toLowerCase();
//               default:
//                 return true; // unsupported operator, keep the item
//             }
//           } else {
//             return itemValue.toLowerCase() === value.toLowerCase(); // case insensitive equality
//           }
//         })
//       )
//     );
//   }

//   // Handle $and operator
//   if ($and) {
//     const andConditions = Array.isArray($and) ? $and : [$and];
//     filteredData = filteredData.filter((item) =>
//       andConditions.every((condition: Record<string, any>) =>
//         Object.entries(condition).every(([key, value]) => {
//           const itemValue = _get(item, key, "").toString();
//           if (typeof value === "object" && !Array.isArray(value)) {
//             const operator = Object.keys(value)[0];
//             const operand = value[operator];
//             switch (operator) {
//               case "$in":
//                 return operand.includes(itemValue.toLowerCase());
//               case "$nin":
//                 return !operand.includes(itemValue.toLowerCase());
//               case "$lt":
//                 return itemValue.toLowerCase() < operand.toLowerCase();
//               case "$lte":
//                 return itemValue.toLowerCase() <= operand.toLowerCase();
//               case "$gt":
//                 return itemValue.toLowerCase() > operand.toLowerCase();
//               case "$gte":
//                 return itemValue.toLowerCase() >= operand.toLowerCase();
//               case "$ne":
//                 return itemValue.toLowerCase() !== operand.toLowerCase();
//               default:
//                 return true; // unsupported operator, keep the item
//             }
//           } else {
//             return itemValue.toLowerCase() === value.toLowerCase(); // case insensitive equality
//           }
//         })
//       )
//     );
//   }

//   // Handle other special query parameters
//   if ($limit) {
//     filteredData = filteredData.slice(0, $limit);
//   }

//   if ($skip) {
//     filteredData = filteredData.slice($skip);
//   }

//   if ($sort) {
//     const sortFields = typeof $sort === "object" ? $sort : { [$sort]: 1 };
//     const sortKeys = Object.keys(sortFields);
//     filteredData.sort((a, b) => {
//       for (const key of sortKeys) {
//         const order = sortFields[key];
//         const aValue = _get(a, key);
//         const bValue = _get(b, key);
//         if (aValue < bValue) return -order;
//         if (aValue > bValue) return order;
//       }
//       return 0;
//     });
//   }

//   if ($select) {
//     filteredData = filteredData.map((item) => {
//       const newItem: Record<string, any> = {};
//       if (Array.isArray($select)) {
//         $select.forEach((field: string) => {
//           newItem[field] = _get(item, field);
//         });
//       } else {
//         newItem[$select] = _get(item, $select);
//       }
//       return newItem;
//     });
//   }

//   return filteredData;
// }
