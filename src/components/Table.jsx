import React from "react";

const Table = (props) => {
  const { data, haeders, onEdit, onDel } = props;
  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  {haeders.map((elem) => {
                    return (
                      <th scope="col" class="px-6 py-4">
                        {elem}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((elem, index) => {
                  let keys = Object.keys(elem);
                  let tds = keys.map((item) => {
                    if (item === "id") {
                      return (
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          {elem[item]}
                        </td>
                      );
                    }

                    return (
                      <td class="whitespace-nowrap px-6 py-4">{elem[item]}</td>
                    );
                  });
                  if ((index + 1) % 2 == 0) {
                    return (
                      <tr class="border-b bg-white  dark:border-neutral-500">
                        {tds}
                        <td>
                          <button onClick={() => onEdit(elem.id)}>edit</button>
                          <button onClick={() => onDel(elem.id)}>del</button>
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr class="border-b bg-neutral-100 dark:border-neutral-500">
                      {tds}
                      <td>
                        <button onClick={() => onEdit(elem.id)}>edit</button>
                        <button onClick={() => onDel(elem.id)}>del</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
