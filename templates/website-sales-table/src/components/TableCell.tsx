import RatingStars from "./RatingStars.tsx";

export function TableCell(
  { key, value }: { key: string; value: string },
) {
  switch (key) {
    case "Product title":
      return (
        <th
          scope="row"
          class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div class="flex items-center mr-3">
            <img
              src="https://placehold.co/600x400.webp"
              alt={value}
              class="h-8 w-auto mr-3"
            />
            {value}
          </div>
        </th>
      );
    case "ASIN":
      return (
        <td class="n-badge-gray">
          {value}
        </td>
      );
    case "Category":
      return (
        <td class="px-4 py-3">
          <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {value}
          </span>
        </td>
      );
    case "Rating":
      return (
        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <RatingStars rating={value} />
        </td>
      );
    case "Sales":
      return (
        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-gray-400 mr-2"
              aria-hidden="true"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
            {value}
          </div>
        </td>
      );
    case "Stock":
      return (
        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div class="flex items-center">
            <div class="h-4 w-4 rounded-full inline-block mr-2 bg-red-700" />
            {value}
          </div>
        </td>
      );
    default:
      return <td class="px-4 py-3">{value}</td>;
  }
}
