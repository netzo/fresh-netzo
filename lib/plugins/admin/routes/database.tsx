import { DrizzleStudioRef } from '@drizzle-team/studio-netzo';
import { Workspace } from '@netzo/api';
import { defineRoute, type RouteConfig } from "fresh/server.ts";
import 'npm:@drizzle-team/studio-netzo@0.0.3';
import React, { useEffect, useMemo, useRef } from 'react';
import { useMainStore } from '~/stores/mainStore'; // Assuming useMainStore is imported from somewhere
import { createNetzoDb } from '~/utils/apis';
import { type AdminConfig } from "../plugin.ts";
import { cssVariablesDark } from './theme.dark';
import { cssVariablesLight } from './theme.light';

type Props = {
  database: Workspace['database'];
};

function DrizzleStudio({ database }) {
  const mainStore = useMainStore();
  const db = useMemo(() => createNetzoDb(database.name), [database.name]);
  const studioRef = useRef<DrizzleStudioRef>(null);

  useEffect(() => {
    // Define the drizzle function with heuristic parsing of arguments
    window.drizzle = async (...args: (string | any[] | boolean)[]) => {
      const sql = args.find(arg => typeof arg === 'string') as string;
      const params = args.find(arg => Array.isArray(arg)) as any[];
      const arrayMode = args.find(arg => typeof arg === 'boolean') as boolean;

      const result = await db.post({ sql, params, arrayMode });

      if (result && result.rows && Array.isArray(result.rows)) {
        return result; // if the data is an array, return it
      } else if (result.code && result.message) {
        throw new Error(result.message); // forward errors from database
      } else {
        throw new Error('Invalid response from server'); // else generic error
      }
    };

    return () => {
      if (studioRef.current?.reset) studioRef.current.reset();
    };
  }, [db]);

  const cssVariables = useMemo(() => {
    return JSON.stringify(mainStore.darkTheme ? cssVariablesDark : cssVariablesLight);
  }, [mainStore.darkTheme]);

  return (
    <drizzle-studio
      ref={studioRef}
      db-hash={database.id ?? database.name}
      css-variables={cssVariables}
      className="grow min-h-0"
    />
  );
};

// FIXME: not working for plugin-injected routes
// see https://github.com/denoland/fresh/issues/2296),
// https://github.com/denoland/fresh/issues/2352
// and https://github.com/denoland/fresh/pull/2297
export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default (config: AdminConfig) => {
  const { db } = config;
  return defineRoute(async (req, ctx) => {
    const { permissions = [] } = ctx.state?.auth?.sessionUser?.data ?? {}; // defaults to none
    const $users = await db.query.$users.findMany();

    return <DrizzleStudio $users={$users} permissions={permissions} />;
  });
};
