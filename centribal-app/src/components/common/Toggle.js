"use client";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LanguageToggle() {
  const router = useRouter();
  const { lang } = useParams();
  const pathname = usePathname();
  var defaultEnabled = null;
  switch (lang) {
    case "en":
      defaultEnabled = true;
      break;
    case "sp":
      defaultEnabled = false;
      break;
    default:
      break;
  }
  const [enabled, setEnabled] = useState(defaultEnabled);

  const onChangeHandler = (e) => {
    let initialPath = "/" + lang;
    let resultPath = pathname.startsWith(initialPath) ? pathname.substring(initialPath.length + 1) : pathname;
    switch (e) {
      case true:
        router.push("/en/" + resultPath);
        break;
      case false:
        router.push("/sp/" + resultPath);
        break;
      default:
        break;
    }
    setEnabled(e);
  };

  return (
    <span className="flex items-center">
      <span className="mx-4">Español</span>
      <Switch
        checked={enabled}
        onChange={onChangeHandler}
        className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      >
        <span className="sr-only">Use setting</span>
        <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />

        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "bg-indigo-600" : "bg-gray-200",
            "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
          )}
        />
      </Switch>
      <span className="mx-4">English</span>
    </span>
  );
}
