
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AdminUser
 * 
 */
export type AdminUser = $Result.DefaultSelection<Prisma.$AdminUserPayload>
/**
 * Model AdminAuditLog
 * 
 */
export type AdminAuditLog = $Result.DefaultSelection<Prisma.$AdminAuditLogPayload>
/**
 * Model CaseStudy
 * 
 */
export type CaseStudy = $Result.DefaultSelection<Prisma.$CaseStudyPayload>
/**
 * Model ContactSubmission
 * 
 */
export type ContactSubmission = $Result.DefaultSelection<Prisma.$ContactSubmissionPayload>
/**
 * Model AnalyticsSession
 * 
 */
export type AnalyticsSession = $Result.DefaultSelection<Prisma.$AnalyticsSessionPayload>
/**
 * Model AnalyticsEvent
 * 
 */
export type AnalyticsEvent = $Result.DefaultSelection<Prisma.$AnalyticsEventPayload>
/**
 * Model PortfolioProject
 * 
 */
export type PortfolioProject = $Result.DefaultSelection<Prisma.$PortfolioProjectPayload>
/**
 * Model SiteText
 * 
 */
export type SiteText = $Result.DefaultSelection<Prisma.$SiteTextPayload>
/**
 * Model CompanySetting
 * 
 */
export type CompanySetting = $Result.DefaultSelection<Prisma.$CompanySettingPayload>
/**
 * Model MediaAsset
 * 
 */
export type MediaAsset = $Result.DefaultSelection<Prisma.$MediaAssetPayload>
/**
 * Model PortalProject
 * 
 */
export type PortalProject = $Result.DefaultSelection<Prisma.$PortalProjectPayload>
/**
 * Model PortalProjectFile
 * 
 */
export type PortalProjectFile = $Result.DefaultSelection<Prisma.$PortalProjectFilePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CaseStudyStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

export type CaseStudyStatus = (typeof CaseStudyStatus)[keyof typeof CaseStudyStatus]


export const ContactStatus: {
  NEW: 'NEW',
  READ: 'READ',
  REPLIED: 'REPLIED',
  ARCHIVED: 'ARCHIVED'
};

export type ContactStatus = (typeof ContactStatus)[keyof typeof ContactStatus]


export const AnalyticsEventType: {
  PAGE_VIEW: 'PAGE_VIEW',
  CASE_STUDY_VIEW: 'CASE_STUDY_VIEW',
  SCROLL_DEPTH: 'SCROLL_DEPTH',
  TIME_ON_PAGE: 'TIME_ON_PAGE',
  CTA_CLICK: 'CTA_CLICK',
  PRICING_VIEW: 'PRICING_VIEW',
  PRICING_CLICK: 'PRICING_CLICK',
  CONTACT_OPEN: 'CONTACT_OPEN',
  CONTACT_START: 'CONTACT_START',
  CONTACT_SUBMIT: 'CONTACT_SUBMIT',
  CONTACT_SUCCESS: 'CONTACT_SUCCESS',
  CONTACT_ERROR: 'CONTACT_ERROR',
  OUTBOUND_CLICK: 'OUTBOUND_CLICK',
  ERROR: 'ERROR'
};

export type AnalyticsEventType = (typeof AnalyticsEventType)[keyof typeof AnalyticsEventType]


export const AdminRole: {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR'
};

export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole]


export const PortalProjectStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
};

export type PortalProjectStatus = (typeof PortalProjectStatus)[keyof typeof PortalProjectStatus]

}

export type CaseStudyStatus = $Enums.CaseStudyStatus

export const CaseStudyStatus: typeof $Enums.CaseStudyStatus

export type ContactStatus = $Enums.ContactStatus

export const ContactStatus: typeof $Enums.ContactStatus

export type AnalyticsEventType = $Enums.AnalyticsEventType

export const AnalyticsEventType: typeof $Enums.AnalyticsEventType

export type AdminRole = $Enums.AdminRole

export const AdminRole: typeof $Enums.AdminRole

export type PortalProjectStatus = $Enums.PortalProjectStatus

export const PortalProjectStatus: typeof $Enums.PortalProjectStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AdminUsers
 * const adminUsers = await prisma.adminUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AdminUsers
   * const adminUsers = await prisma.adminUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.adminUser`: Exposes CRUD operations for the **AdminUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUser.findMany()
    * ```
    */
  get adminUser(): Prisma.AdminUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminAuditLog`: Exposes CRUD operations for the **AdminAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminAuditLogs
    * const adminAuditLogs = await prisma.adminAuditLog.findMany()
    * ```
    */
  get adminAuditLog(): Prisma.AdminAuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caseStudy`: Exposes CRUD operations for the **CaseStudy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaseStudies
    * const caseStudies = await prisma.caseStudy.findMany()
    * ```
    */
  get caseStudy(): Prisma.CaseStudyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactSubmission`: Exposes CRUD operations for the **ContactSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactSubmissions
    * const contactSubmissions = await prisma.contactSubmission.findMany()
    * ```
    */
  get contactSubmission(): Prisma.ContactSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analyticsSession`: Exposes CRUD operations for the **AnalyticsSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalyticsSessions
    * const analyticsSessions = await prisma.analyticsSession.findMany()
    * ```
    */
  get analyticsSession(): Prisma.AnalyticsSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analyticsEvent`: Exposes CRUD operations for the **AnalyticsEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalyticsEvents
    * const analyticsEvents = await prisma.analyticsEvent.findMany()
    * ```
    */
  get analyticsEvent(): Prisma.AnalyticsEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolioProject`: Exposes CRUD operations for the **PortfolioProject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortfolioProjects
    * const portfolioProjects = await prisma.portfolioProject.findMany()
    * ```
    */
  get portfolioProject(): Prisma.PortfolioProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siteText`: Exposes CRUD operations for the **SiteText** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteTexts
    * const siteTexts = await prisma.siteText.findMany()
    * ```
    */
  get siteText(): Prisma.SiteTextDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companySetting`: Exposes CRUD operations for the **CompanySetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanySettings
    * const companySettings = await prisma.companySetting.findMany()
    * ```
    */
  get companySetting(): Prisma.CompanySettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaAsset`: Exposes CRUD operations for the **MediaAsset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaAssets
    * const mediaAssets = await prisma.mediaAsset.findMany()
    * ```
    */
  get mediaAsset(): Prisma.MediaAssetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portalProject`: Exposes CRUD operations for the **PortalProject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortalProjects
    * const portalProjects = await prisma.portalProject.findMany()
    * ```
    */
  get portalProject(): Prisma.PortalProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portalProjectFile`: Exposes CRUD operations for the **PortalProjectFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortalProjectFiles
    * const portalProjectFiles = await prisma.portalProjectFile.findMany()
    * ```
    */
  get portalProjectFile(): Prisma.PortalProjectFileDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AdminUser: 'AdminUser',
    AdminAuditLog: 'AdminAuditLog',
    CaseStudy: 'CaseStudy',
    ContactSubmission: 'ContactSubmission',
    AnalyticsSession: 'AnalyticsSession',
    AnalyticsEvent: 'AnalyticsEvent',
    PortfolioProject: 'PortfolioProject',
    SiteText: 'SiteText',
    CompanySetting: 'CompanySetting',
    MediaAsset: 'MediaAsset',
    PortalProject: 'PortalProject',
    PortalProjectFile: 'PortalProjectFile'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "adminUser" | "adminAuditLog" | "caseStudy" | "contactSubmission" | "analyticsSession" | "analyticsEvent" | "portfolioProject" | "siteText" | "companySetting" | "mediaAsset" | "portalProject" | "portalProjectFile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AdminUser: {
        payload: Prisma.$AdminUserPayload<ExtArgs>
        fields: Prisma.AdminUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findFirst: {
            args: Prisma.AdminUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findMany: {
            args: Prisma.AdminUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          create: {
            args: Prisma.AdminUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          createMany: {
            args: Prisma.AdminUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          delete: {
            args: Prisma.AdminUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          update: {
            args: Prisma.AdminUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          deleteMany: {
            args: Prisma.AdminUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          upsert: {
            args: Prisma.AdminUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          aggregate: {
            args: Prisma.AdminUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUser>
          }
          groupBy: {
            args: Prisma.AdminUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUserCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUserCountAggregateOutputType> | number
          }
        }
      }
      AdminAuditLog: {
        payload: Prisma.$AdminAuditLogPayload<ExtArgs>
        fields: Prisma.AdminAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>
          }
          findFirst: {
            args: Prisma.AdminAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>
          }
          findMany: {
            args: Prisma.AdminAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>[]
          }
          create: {
            args: Prisma.AdminAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>
          }
          createMany: {
            args: Prisma.AdminAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>[]
          }
          delete: {
            args: Prisma.AdminAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>
          }
          update: {
            args: Prisma.AdminAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AdminAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminAuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AdminAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditLogPayload>
          }
          aggregate: {
            args: Prisma.AdminAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminAuditLog>
          }
          groupBy: {
            args: Prisma.AdminAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AdminAuditLogCountAggregateOutputType> | number
          }
        }
      }
      CaseStudy: {
        payload: Prisma.$CaseStudyPayload<ExtArgs>
        fields: Prisma.CaseStudyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseStudyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseStudyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload>
          }
          findFirst: {
            args: Prisma.CaseStudyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseStudyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload>
          }
          findMany: {
            args: Prisma.CaseStudyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload>[]
          }
          create: {
            args: Prisma.CaseStudyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload>
          }
          createMany: {
            args: Prisma.CaseStudyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseStudyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload>[]
          }
          delete: {
            args: Prisma.CaseStudyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload>
          }
          update: {
            args: Prisma.CaseStudyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload>
          }
          deleteMany: {
            args: Prisma.CaseStudyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseStudyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseStudyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload>[]
          }
          upsert: {
            args: Prisma.CaseStudyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStudyPayload>
          }
          aggregate: {
            args: Prisma.CaseStudyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaseStudy>
          }
          groupBy: {
            args: Prisma.CaseStudyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseStudyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseStudyCountArgs<ExtArgs>
            result: $Utils.Optional<CaseStudyCountAggregateOutputType> | number
          }
        }
      }
      ContactSubmission: {
        payload: Prisma.$ContactSubmissionPayload<ExtArgs>
        fields: Prisma.ContactSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload>
          }
          findFirst: {
            args: Prisma.ContactSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload>
          }
          findMany: {
            args: Prisma.ContactSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload>[]
          }
          create: {
            args: Prisma.ContactSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload>
          }
          createMany: {
            args: Prisma.ContactSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload>[]
          }
          delete: {
            args: Prisma.ContactSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload>
          }
          update: {
            args: Prisma.ContactSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.ContactSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.ContactSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactSubmissionPayload>
          }
          aggregate: {
            args: Prisma.ContactSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactSubmission>
          }
          groupBy: {
            args: Prisma.ContactSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<ContactSubmissionCountAggregateOutputType> | number
          }
        }
      }
      AnalyticsSession: {
        payload: Prisma.$AnalyticsSessionPayload<ExtArgs>
        fields: Prisma.AnalyticsSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticsSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticsSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload>
          }
          findFirst: {
            args: Prisma.AnalyticsSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticsSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload>
          }
          findMany: {
            args: Prisma.AnalyticsSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload>[]
          }
          create: {
            args: Prisma.AnalyticsSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload>
          }
          createMany: {
            args: Prisma.AnalyticsSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalyticsSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload>[]
          }
          delete: {
            args: Prisma.AnalyticsSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload>
          }
          update: {
            args: Prisma.AnalyticsSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticsSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticsSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalyticsSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload>[]
          }
          upsert: {
            args: Prisma.AnalyticsSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsSessionPayload>
          }
          aggregate: {
            args: Prisma.AnalyticsSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalyticsSession>
          }
          groupBy: {
            args: Prisma.AnalyticsSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticsSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsSessionCountAggregateOutputType> | number
          }
        }
      }
      AnalyticsEvent: {
        payload: Prisma.$AnalyticsEventPayload<ExtArgs>
        fields: Prisma.AnalyticsEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticsEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findFirst: {
            args: Prisma.AnalyticsEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticsEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findMany: {
            args: Prisma.AnalyticsEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          create: {
            args: Prisma.AnalyticsEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          createMany: {
            args: Prisma.AnalyticsEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalyticsEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          delete: {
            args: Prisma.AnalyticsEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          update: {
            args: Prisma.AnalyticsEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticsEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticsEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalyticsEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          upsert: {
            args: Prisma.AnalyticsEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          aggregate: {
            args: Prisma.AnalyticsEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalyticsEvent>
          }
          groupBy: {
            args: Prisma.AnalyticsEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticsEventCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventCountAggregateOutputType> | number
          }
        }
      }
      PortfolioProject: {
        payload: Prisma.$PortfolioProjectPayload<ExtArgs>
        fields: Prisma.PortfolioProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload>
          }
          findFirst: {
            args: Prisma.PortfolioProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload>
          }
          findMany: {
            args: Prisma.PortfolioProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload>[]
          }
          create: {
            args: Prisma.PortfolioProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload>
          }
          createMany: {
            args: Prisma.PortfolioProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortfolioProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload>[]
          }
          delete: {
            args: Prisma.PortfolioProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload>
          }
          update: {
            args: Prisma.PortfolioProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortfolioProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload>[]
          }
          upsert: {
            args: Prisma.PortfolioProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioProjectPayload>
          }
          aggregate: {
            args: Prisma.PortfolioProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolioProject>
          }
          groupBy: {
            args: Prisma.PortfolioProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioProjectCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioProjectCountAggregateOutputType> | number
          }
        }
      }
      SiteText: {
        payload: Prisma.$SiteTextPayload<ExtArgs>
        fields: Prisma.SiteTextFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteTextFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteTextFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload>
          }
          findFirst: {
            args: Prisma.SiteTextFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteTextFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload>
          }
          findMany: {
            args: Prisma.SiteTextFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload>[]
          }
          create: {
            args: Prisma.SiteTextCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload>
          }
          createMany: {
            args: Prisma.SiteTextCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteTextCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload>[]
          }
          delete: {
            args: Prisma.SiteTextDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload>
          }
          update: {
            args: Prisma.SiteTextUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload>
          }
          deleteMany: {
            args: Prisma.SiteTextDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteTextUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteTextUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload>[]
          }
          upsert: {
            args: Prisma.SiteTextUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteTextPayload>
          }
          aggregate: {
            args: Prisma.SiteTextAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteText>
          }
          groupBy: {
            args: Prisma.SiteTextGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteTextGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteTextCountArgs<ExtArgs>
            result: $Utils.Optional<SiteTextCountAggregateOutputType> | number
          }
        }
      }
      CompanySetting: {
        payload: Prisma.$CompanySettingPayload<ExtArgs>
        fields: Prisma.CompanySettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanySettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanySettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload>
          }
          findFirst: {
            args: Prisma.CompanySettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanySettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload>
          }
          findMany: {
            args: Prisma.CompanySettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload>[]
          }
          create: {
            args: Prisma.CompanySettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload>
          }
          createMany: {
            args: Prisma.CompanySettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanySettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload>[]
          }
          delete: {
            args: Prisma.CompanySettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload>
          }
          update: {
            args: Prisma.CompanySettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload>
          }
          deleteMany: {
            args: Prisma.CompanySettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanySettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanySettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload>[]
          }
          upsert: {
            args: Prisma.CompanySettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySettingPayload>
          }
          aggregate: {
            args: Prisma.CompanySettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanySetting>
          }
          groupBy: {
            args: Prisma.CompanySettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanySettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanySettingCountArgs<ExtArgs>
            result: $Utils.Optional<CompanySettingCountAggregateOutputType> | number
          }
        }
      }
      MediaAsset: {
        payload: Prisma.$MediaAssetPayload<ExtArgs>
        fields: Prisma.MediaAssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaAssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaAssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload>
          }
          findFirst: {
            args: Prisma.MediaAssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaAssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload>
          }
          findMany: {
            args: Prisma.MediaAssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload>[]
          }
          create: {
            args: Prisma.MediaAssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload>
          }
          createMany: {
            args: Prisma.MediaAssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaAssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload>[]
          }
          delete: {
            args: Prisma.MediaAssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload>
          }
          update: {
            args: Prisma.MediaAssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload>
          }
          deleteMany: {
            args: Prisma.MediaAssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaAssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaAssetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload>[]
          }
          upsert: {
            args: Prisma.MediaAssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaAssetPayload>
          }
          aggregate: {
            args: Prisma.MediaAssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaAsset>
          }
          groupBy: {
            args: Prisma.MediaAssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaAssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaAssetCountArgs<ExtArgs>
            result: $Utils.Optional<MediaAssetCountAggregateOutputType> | number
          }
        }
      }
      PortalProject: {
        payload: Prisma.$PortalProjectPayload<ExtArgs>
        fields: Prisma.PortalProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortalProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortalProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload>
          }
          findFirst: {
            args: Prisma.PortalProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortalProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload>
          }
          findMany: {
            args: Prisma.PortalProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload>[]
          }
          create: {
            args: Prisma.PortalProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload>
          }
          createMany: {
            args: Prisma.PortalProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortalProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload>[]
          }
          delete: {
            args: Prisma.PortalProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload>
          }
          update: {
            args: Prisma.PortalProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload>
          }
          deleteMany: {
            args: Prisma.PortalProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortalProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortalProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload>[]
          }
          upsert: {
            args: Prisma.PortalProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectPayload>
          }
          aggregate: {
            args: Prisma.PortalProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortalProject>
          }
          groupBy: {
            args: Prisma.PortalProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortalProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortalProjectCountArgs<ExtArgs>
            result: $Utils.Optional<PortalProjectCountAggregateOutputType> | number
          }
        }
      }
      PortalProjectFile: {
        payload: Prisma.$PortalProjectFilePayload<ExtArgs>
        fields: Prisma.PortalProjectFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortalProjectFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortalProjectFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload>
          }
          findFirst: {
            args: Prisma.PortalProjectFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortalProjectFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload>
          }
          findMany: {
            args: Prisma.PortalProjectFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload>[]
          }
          create: {
            args: Prisma.PortalProjectFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload>
          }
          createMany: {
            args: Prisma.PortalProjectFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PortalProjectFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload>[]
          }
          delete: {
            args: Prisma.PortalProjectFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload>
          }
          update: {
            args: Prisma.PortalProjectFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload>
          }
          deleteMany: {
            args: Prisma.PortalProjectFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortalProjectFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PortalProjectFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload>[]
          }
          upsert: {
            args: Prisma.PortalProjectFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortalProjectFilePayload>
          }
          aggregate: {
            args: Prisma.PortalProjectFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortalProjectFile>
          }
          groupBy: {
            args: Prisma.PortalProjectFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortalProjectFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortalProjectFileCountArgs<ExtArgs>
            result: $Utils.Optional<PortalProjectFileCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    adminUser?: AdminUserOmit
    adminAuditLog?: AdminAuditLogOmit
    caseStudy?: CaseStudyOmit
    contactSubmission?: ContactSubmissionOmit
    analyticsSession?: AnalyticsSessionOmit
    analyticsEvent?: AnalyticsEventOmit
    portfolioProject?: PortfolioProjectOmit
    siteText?: SiteTextOmit
    companySetting?: CompanySettingOmit
    mediaAsset?: MediaAssetOmit
    portalProject?: PortalProjectOmit
    portalProjectFile?: PortalProjectFileOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AnalyticsSessionCountOutputType
   */

  export type AnalyticsSessionCountOutputType = {
    events: number
  }

  export type AnalyticsSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | AnalyticsSessionCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * AnalyticsSessionCountOutputType without action
   */
  export type AnalyticsSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSessionCountOutputType
     */
    select?: AnalyticsSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnalyticsSessionCountOutputType without action
   */
  export type AnalyticsSessionCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
  }


  /**
   * Count Type PortalProjectCountOutputType
   */

  export type PortalProjectCountOutputType = {
    files: number
  }

  export type PortalProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | PortalProjectCountOutputTypeCountFilesArgs
  }

  // Custom InputTypes
  /**
   * PortalProjectCountOutputType without action
   */
  export type PortalProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectCountOutputType
     */
    select?: PortalProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PortalProjectCountOutputType without action
   */
  export type PortalProjectCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortalProjectFileWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AdminUser
   */

  export type AggregateAdminUser = {
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  export type AdminUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.AdminRole | null
    active: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.AdminRole | null
    active: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    active: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminUserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    active?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    active?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    active?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUser to aggregate.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUserMaxAggregateInputType
  }

  export type GetAdminUserAggregateType<T extends AdminUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUser[P]>
      : GetScalarType<T[P], AggregateAdminUser[P]>
  }




  export type AdminUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithAggregationInput | AdminUserOrderByWithAggregationInput[]
    by: AdminUserScalarFieldEnum[] | AdminUserScalarFieldEnum
    having?: AdminUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUserCountAggregateInputType | true
    _min?: AdminUserMinAggregateInputType
    _max?: AdminUserMaxAggregateInputType
  }

  export type AdminUserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: $Enums.AdminRole
    active: boolean
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  type GetAdminUserGroupByPayload<T extends AdminUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
        }
      >
    >


  export type AdminUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    active?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    active?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    active?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    active?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "role" | "active" | "lastLoginAt" | "createdAt" | "updatedAt", ExtArgs["result"]["adminUser"]>

  export type $AdminUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUser"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: $Enums.AdminRole
      active: boolean
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminUser"]>
    composites: {}
  }

  type AdminUserGetPayload<S extends boolean | null | undefined | AdminUserDefaultArgs> = $Result.GetResult<Prisma.$AdminUserPayload, S>

  type AdminUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminUserCountAggregateInputType | true
    }

  export interface AdminUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUser'], meta: { name: 'AdminUser' } }
    /**
     * Find zero or one AdminUser that matches the filter.
     * @param {AdminUserFindUniqueArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUserFindUniqueArgs>(args: SelectSubset<T, AdminUserFindUniqueArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminUserFindUniqueOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUserFindFirstArgs>(args?: SelectSubset<T, AdminUserFindFirstArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUser.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminUserFindManyArgs>(args?: SelectSubset<T, AdminUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminUser.
     * @param {AdminUserCreateArgs} args - Arguments to create a AdminUser.
     * @example
     * // Create one AdminUser
     * const AdminUser = await prisma.adminUser.create({
     *   data: {
     *     // ... data to create a AdminUser
     *   }
     * })
     * 
     */
    create<T extends AdminUserCreateArgs>(args: SelectSubset<T, AdminUserCreateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminUsers.
     * @param {AdminUserCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUserCreateManyArgs>(args?: SelectSubset<T, AdminUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminUsers and returns the data saved in the database.
     * @param {AdminUserCreateManyAndReturnArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminUser.
     * @param {AdminUserDeleteArgs} args - Arguments to delete one AdminUser.
     * @example
     * // Delete one AdminUser
     * const AdminUser = await prisma.adminUser.delete({
     *   where: {
     *     // ... filter to delete one AdminUser
     *   }
     * })
     * 
     */
    delete<T extends AdminUserDeleteArgs>(args: SelectSubset<T, AdminUserDeleteArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminUser.
     * @param {AdminUserUpdateArgs} args - Arguments to update one AdminUser.
     * @example
     * // Update one AdminUser
     * const adminUser = await prisma.adminUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUserUpdateArgs>(args: SelectSubset<T, AdminUserUpdateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUserDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUserDeleteManyArgs>(args?: SelectSubset<T, AdminUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUserUpdateManyArgs>(args: SelectSubset<T, AdminUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers and returns the data updated in the database.
     * @param {AdminUserUpdateManyAndReturnArgs} args - Arguments to update many AdminUsers.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUserUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminUser.
     * @param {AdminUserUpsertArgs} args - Arguments to update or create a AdminUser.
     * @example
     * // Update or create a AdminUser
     * const adminUser = await prisma.adminUser.upsert({
     *   create: {
     *     // ... data to create a AdminUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUser we want to update
     *   }
     * })
     */
    upsert<T extends AdminUserUpsertArgs>(args: SelectSubset<T, AdminUserUpsertArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUser.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUserCountArgs>(
      args?: Subset<T, AdminUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminUserAggregateArgs>(args: Subset<T, AdminUserAggregateArgs>): Prisma.PrismaPromise<GetAdminUserAggregateType<T>>

    /**
     * Group by AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUserGroupByArgs['orderBy'] }
        : { orderBy?: AdminUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUser model
   */
  readonly fields: AdminUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminUser model
   */
  interface AdminUserFieldRefs {
    readonly id: FieldRef<"AdminUser", 'String'>
    readonly email: FieldRef<"AdminUser", 'String'>
    readonly passwordHash: FieldRef<"AdminUser", 'String'>
    readonly role: FieldRef<"AdminUser", 'AdminRole'>
    readonly active: FieldRef<"AdminUser", 'Boolean'>
    readonly lastLoginAt: FieldRef<"AdminUser", 'DateTime'>
    readonly createdAt: FieldRef<"AdminUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminUser findUnique
   */
  export type AdminUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findUniqueOrThrow
   */
  export type AdminUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findFirst
   */
  export type AdminUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findFirstOrThrow
   */
  export type AdminUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findMany
   */
  export type AdminUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser create
   */
  export type AdminUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminUser.
     */
    data: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
  }

  /**
   * AdminUser createMany
   */
  export type AdminUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser createManyAndReturn
   */
  export type AdminUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser update
   */
  export type AdminUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminUser.
     */
    data: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
    /**
     * Choose, which AdminUser to update.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser updateMany
   */
  export type AdminUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUser updateManyAndReturn
   */
  export type AdminUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUser upsert
   */
  export type AdminUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminUser to update in case it exists.
     */
    where: AdminUserWhereUniqueInput
    /**
     * In case the AdminUser found by the `where` argument doesn't exist, create a new AdminUser with this data.
     */
    create: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
    /**
     * In case the AdminUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
  }

  /**
   * AdminUser delete
   */
  export type AdminUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Filter which AdminUser to delete.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser deleteMany
   */
  export type AdminUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to delete.
     */
    limit?: number
  }

  /**
   * AdminUser without action
   */
  export type AdminUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
  }


  /**
   * Model AdminAuditLog
   */

  export type AggregateAdminAuditLog = {
    _count: AdminAuditLogCountAggregateOutputType | null
    _min: AdminAuditLogMinAggregateOutputType | null
    _max: AdminAuditLogMaxAggregateOutputType | null
  }

  export type AdminAuditLogMinAggregateOutputType = {
    id: string | null
    adminId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ipHash: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AdminAuditLogMaxAggregateOutputType = {
    id: string | null
    adminId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ipHash: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AdminAuditLogCountAggregateOutputType = {
    id: number
    adminId: number
    action: number
    entity: number
    entityId: number
    metadata: number
    ipHash: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type AdminAuditLogMinAggregateInputType = {
    id?: true
    adminId?: true
    action?: true
    entity?: true
    entityId?: true
    ipHash?: true
    userAgent?: true
    createdAt?: true
  }

  export type AdminAuditLogMaxAggregateInputType = {
    id?: true
    adminId?: true
    action?: true
    entity?: true
    entityId?: true
    ipHash?: true
    userAgent?: true
    createdAt?: true
  }

  export type AdminAuditLogCountAggregateInputType = {
    id?: true
    adminId?: true
    action?: true
    entity?: true
    entityId?: true
    metadata?: true
    ipHash?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type AdminAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminAuditLog to aggregate.
     */
    where?: AdminAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAuditLogs to fetch.
     */
    orderBy?: AdminAuditLogOrderByWithRelationInput | AdminAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminAuditLogs
    **/
    _count?: true | AdminAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminAuditLogMaxAggregateInputType
  }

  export type GetAdminAuditLogAggregateType<T extends AdminAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminAuditLog[P]>
      : GetScalarType<T[P], AggregateAdminAuditLog[P]>
  }




  export type AdminAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminAuditLogWhereInput
    orderBy?: AdminAuditLogOrderByWithAggregationInput | AdminAuditLogOrderByWithAggregationInput[]
    by: AdminAuditLogScalarFieldEnum[] | AdminAuditLogScalarFieldEnum
    having?: AdminAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminAuditLogCountAggregateInputType | true
    _min?: AdminAuditLogMinAggregateInputType
    _max?: AdminAuditLogMaxAggregateInputType
  }

  export type AdminAuditLogGroupByOutputType = {
    id: string
    adminId: string | null
    action: string
    entity: string | null
    entityId: string | null
    metadata: JsonValue | null
    ipHash: string | null
    userAgent: string | null
    createdAt: Date
    _count: AdminAuditLogCountAggregateOutputType | null
    _min: AdminAuditLogMinAggregateOutputType | null
    _max: AdminAuditLogMaxAggregateOutputType | null
  }

  type GetAdminAuditLogGroupByPayload<T extends AdminAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AdminAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AdminAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    ipHash?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminAuditLog"]>

  export type AdminAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    ipHash?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminAuditLog"]>

  export type AdminAuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    ipHash?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminAuditLog"]>

  export type AdminAuditLogSelectScalar = {
    id?: boolean
    adminId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    metadata?: boolean
    ipHash?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type AdminAuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminId" | "action" | "entity" | "entityId" | "metadata" | "ipHash" | "userAgent" | "createdAt", ExtArgs["result"]["adminAuditLog"]>

  export type $AdminAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminAuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminId: string | null
      action: string
      entity: string | null
      entityId: string | null
      metadata: Prisma.JsonValue | null
      ipHash: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["adminAuditLog"]>
    composites: {}
  }

  type AdminAuditLogGetPayload<S extends boolean | null | undefined | AdminAuditLogDefaultArgs> = $Result.GetResult<Prisma.$AdminAuditLogPayload, S>

  type AdminAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminAuditLogCountAggregateInputType | true
    }

  export interface AdminAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminAuditLog'], meta: { name: 'AdminAuditLog' } }
    /**
     * Find zero or one AdminAuditLog that matches the filter.
     * @param {AdminAuditLogFindUniqueArgs} args - Arguments to find a AdminAuditLog
     * @example
     * // Get one AdminAuditLog
     * const adminAuditLog = await prisma.adminAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminAuditLogFindUniqueArgs>(args: SelectSubset<T, AdminAuditLogFindUniqueArgs<ExtArgs>>): Prisma__AdminAuditLogClient<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminAuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminAuditLogFindUniqueOrThrowArgs} args - Arguments to find a AdminAuditLog
     * @example
     * // Get one AdminAuditLog
     * const adminAuditLog = await prisma.adminAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminAuditLogClient<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditLogFindFirstArgs} args - Arguments to find a AdminAuditLog
     * @example
     * // Get one AdminAuditLog
     * const adminAuditLog = await prisma.adminAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminAuditLogFindFirstArgs>(args?: SelectSubset<T, AdminAuditLogFindFirstArgs<ExtArgs>>): Prisma__AdminAuditLogClient<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditLogFindFirstOrThrowArgs} args - Arguments to find a AdminAuditLog
     * @example
     * // Get one AdminAuditLog
     * const adminAuditLog = await prisma.adminAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminAuditLogClient<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminAuditLogs
     * const adminAuditLogs = await prisma.adminAuditLog.findMany()
     * 
     * // Get first 10 AdminAuditLogs
     * const adminAuditLogs = await prisma.adminAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminAuditLogWithIdOnly = await prisma.adminAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminAuditLogFindManyArgs>(args?: SelectSubset<T, AdminAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminAuditLog.
     * @param {AdminAuditLogCreateArgs} args - Arguments to create a AdminAuditLog.
     * @example
     * // Create one AdminAuditLog
     * const AdminAuditLog = await prisma.adminAuditLog.create({
     *   data: {
     *     // ... data to create a AdminAuditLog
     *   }
     * })
     * 
     */
    create<T extends AdminAuditLogCreateArgs>(args: SelectSubset<T, AdminAuditLogCreateArgs<ExtArgs>>): Prisma__AdminAuditLogClient<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminAuditLogs.
     * @param {AdminAuditLogCreateManyArgs} args - Arguments to create many AdminAuditLogs.
     * @example
     * // Create many AdminAuditLogs
     * const adminAuditLog = await prisma.adminAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminAuditLogCreateManyArgs>(args?: SelectSubset<T, AdminAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminAuditLogs and returns the data saved in the database.
     * @param {AdminAuditLogCreateManyAndReturnArgs} args - Arguments to create many AdminAuditLogs.
     * @example
     * // Create many AdminAuditLogs
     * const adminAuditLog = await prisma.adminAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminAuditLogs and only return the `id`
     * const adminAuditLogWithIdOnly = await prisma.adminAuditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminAuditLog.
     * @param {AdminAuditLogDeleteArgs} args - Arguments to delete one AdminAuditLog.
     * @example
     * // Delete one AdminAuditLog
     * const AdminAuditLog = await prisma.adminAuditLog.delete({
     *   where: {
     *     // ... filter to delete one AdminAuditLog
     *   }
     * })
     * 
     */
    delete<T extends AdminAuditLogDeleteArgs>(args: SelectSubset<T, AdminAuditLogDeleteArgs<ExtArgs>>): Prisma__AdminAuditLogClient<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminAuditLog.
     * @param {AdminAuditLogUpdateArgs} args - Arguments to update one AdminAuditLog.
     * @example
     * // Update one AdminAuditLog
     * const adminAuditLog = await prisma.adminAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminAuditLogUpdateArgs>(args: SelectSubset<T, AdminAuditLogUpdateArgs<ExtArgs>>): Prisma__AdminAuditLogClient<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminAuditLogs.
     * @param {AdminAuditLogDeleteManyArgs} args - Arguments to filter AdminAuditLogs to delete.
     * @example
     * // Delete a few AdminAuditLogs
     * const { count } = await prisma.adminAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminAuditLogDeleteManyArgs>(args?: SelectSubset<T, AdminAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminAuditLogs
     * const adminAuditLog = await prisma.adminAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminAuditLogUpdateManyArgs>(args: SelectSubset<T, AdminAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminAuditLogs and returns the data updated in the database.
     * @param {AdminAuditLogUpdateManyAndReturnArgs} args - Arguments to update many AdminAuditLogs.
     * @example
     * // Update many AdminAuditLogs
     * const adminAuditLog = await prisma.adminAuditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminAuditLogs and only return the `id`
     * const adminAuditLogWithIdOnly = await prisma.adminAuditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminAuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminAuditLog.
     * @param {AdminAuditLogUpsertArgs} args - Arguments to update or create a AdminAuditLog.
     * @example
     * // Update or create a AdminAuditLog
     * const adminAuditLog = await prisma.adminAuditLog.upsert({
     *   create: {
     *     // ... data to create a AdminAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AdminAuditLogUpsertArgs>(args: SelectSubset<T, AdminAuditLogUpsertArgs<ExtArgs>>): Prisma__AdminAuditLogClient<$Result.GetResult<Prisma.$AdminAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditLogCountArgs} args - Arguments to filter AdminAuditLogs to count.
     * @example
     * // Count the number of AdminAuditLogs
     * const count = await prisma.adminAuditLog.count({
     *   where: {
     *     // ... the filter for the AdminAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AdminAuditLogCountArgs>(
      args?: Subset<T, AdminAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAuditLogAggregateArgs>(args: Subset<T, AdminAuditLogAggregateArgs>): Prisma.PrismaPromise<GetAdminAuditLogAggregateType<T>>

    /**
     * Group by AdminAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AdminAuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminAuditLog model
   */
  readonly fields: AdminAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminAuditLog model
   */
  interface AdminAuditLogFieldRefs {
    readonly id: FieldRef<"AdminAuditLog", 'String'>
    readonly adminId: FieldRef<"AdminAuditLog", 'String'>
    readonly action: FieldRef<"AdminAuditLog", 'String'>
    readonly entity: FieldRef<"AdminAuditLog", 'String'>
    readonly entityId: FieldRef<"AdminAuditLog", 'String'>
    readonly metadata: FieldRef<"AdminAuditLog", 'Json'>
    readonly ipHash: FieldRef<"AdminAuditLog", 'String'>
    readonly userAgent: FieldRef<"AdminAuditLog", 'String'>
    readonly createdAt: FieldRef<"AdminAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminAuditLog findUnique
   */
  export type AdminAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAuditLog to fetch.
     */
    where: AdminAuditLogWhereUniqueInput
  }

  /**
   * AdminAuditLog findUniqueOrThrow
   */
  export type AdminAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAuditLog to fetch.
     */
    where: AdminAuditLogWhereUniqueInput
  }

  /**
   * AdminAuditLog findFirst
   */
  export type AdminAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAuditLog to fetch.
     */
    where?: AdminAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAuditLogs to fetch.
     */
    orderBy?: AdminAuditLogOrderByWithRelationInput | AdminAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminAuditLogs.
     */
    cursor?: AdminAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminAuditLogs.
     */
    distinct?: AdminAuditLogScalarFieldEnum | AdminAuditLogScalarFieldEnum[]
  }

  /**
   * AdminAuditLog findFirstOrThrow
   */
  export type AdminAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAuditLog to fetch.
     */
    where?: AdminAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAuditLogs to fetch.
     */
    orderBy?: AdminAuditLogOrderByWithRelationInput | AdminAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminAuditLogs.
     */
    cursor?: AdminAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminAuditLogs.
     */
    distinct?: AdminAuditLogScalarFieldEnum | AdminAuditLogScalarFieldEnum[]
  }

  /**
   * AdminAuditLog findMany
   */
  export type AdminAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAuditLogs to fetch.
     */
    where?: AdminAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAuditLogs to fetch.
     */
    orderBy?: AdminAuditLogOrderByWithRelationInput | AdminAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminAuditLogs.
     */
    cursor?: AdminAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAuditLogs.
     */
    skip?: number
    distinct?: AdminAuditLogScalarFieldEnum | AdminAuditLogScalarFieldEnum[]
  }

  /**
   * AdminAuditLog create
   */
  export type AdminAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminAuditLog.
     */
    data: XOR<AdminAuditLogCreateInput, AdminAuditLogUncheckedCreateInput>
  }

  /**
   * AdminAuditLog createMany
   */
  export type AdminAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminAuditLogs.
     */
    data: AdminAuditLogCreateManyInput | AdminAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminAuditLog createManyAndReturn
   */
  export type AdminAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AdminAuditLogs.
     */
    data: AdminAuditLogCreateManyInput | AdminAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminAuditLog update
   */
  export type AdminAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminAuditLog.
     */
    data: XOR<AdminAuditLogUpdateInput, AdminAuditLogUncheckedUpdateInput>
    /**
     * Choose, which AdminAuditLog to update.
     */
    where: AdminAuditLogWhereUniqueInput
  }

  /**
   * AdminAuditLog updateMany
   */
  export type AdminAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminAuditLogs.
     */
    data: XOR<AdminAuditLogUpdateManyMutationInput, AdminAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AdminAuditLogs to update
     */
    where?: AdminAuditLogWhereInput
    /**
     * Limit how many AdminAuditLogs to update.
     */
    limit?: number
  }

  /**
   * AdminAuditLog updateManyAndReturn
   */
  export type AdminAuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AdminAuditLogs.
     */
    data: XOR<AdminAuditLogUpdateManyMutationInput, AdminAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AdminAuditLogs to update
     */
    where?: AdminAuditLogWhereInput
    /**
     * Limit how many AdminAuditLogs to update.
     */
    limit?: number
  }

  /**
   * AdminAuditLog upsert
   */
  export type AdminAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminAuditLog to update in case it exists.
     */
    where: AdminAuditLogWhereUniqueInput
    /**
     * In case the AdminAuditLog found by the `where` argument doesn't exist, create a new AdminAuditLog with this data.
     */
    create: XOR<AdminAuditLogCreateInput, AdminAuditLogUncheckedCreateInput>
    /**
     * In case the AdminAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminAuditLogUpdateInput, AdminAuditLogUncheckedUpdateInput>
  }

  /**
   * AdminAuditLog delete
   */
  export type AdminAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
    /**
     * Filter which AdminAuditLog to delete.
     */
    where: AdminAuditLogWhereUniqueInput
  }

  /**
   * AdminAuditLog deleteMany
   */
  export type AdminAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminAuditLogs to delete
     */
    where?: AdminAuditLogWhereInput
    /**
     * Limit how many AdminAuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AdminAuditLog without action
   */
  export type AdminAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAuditLog
     */
    select?: AdminAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAuditLog
     */
    omit?: AdminAuditLogOmit<ExtArgs> | null
  }


  /**
   * Model CaseStudy
   */

  export type AggregateCaseStudy = {
    _count: CaseStudyCountAggregateOutputType | null
    _min: CaseStudyMinAggregateOutputType | null
    _max: CaseStudyMaxAggregateOutputType | null
  }

  export type CaseStudyMinAggregateOutputType = {
    id: string | null
    slug: string | null
    status: $Enums.CaseStudyStatus | null
    featured: boolean | null
    publishedAt: Date | null
    kicker: string | null
    title: string | null
    description: string | null
    role: string | null
    timeline: string | null
    overview: string | null
    challengeIntro: string | null
    solution: string | null
    results: string | null
    metaTitle: string | null
    metaDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseStudyMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    status: $Enums.CaseStudyStatus | null
    featured: boolean | null
    publishedAt: Date | null
    kicker: string | null
    title: string | null
    description: string | null
    role: string | null
    timeline: string | null
    overview: string | null
    challengeIntro: string | null
    solution: string | null
    results: string | null
    metaTitle: string | null
    metaDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseStudyCountAggregateOutputType = {
    id: number
    slug: number
    status: number
    featured: number
    publishedAt: number
    kicker: number
    title: number
    description: number
    role: number
    timeline: number
    overview: number
    challengeIntro: number
    challengePoints: number
    approach: number
    solution: number
    results: number
    gallery: number
    stats: number
    metaTitle: number
    metaDescription: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CaseStudyMinAggregateInputType = {
    id?: true
    slug?: true
    status?: true
    featured?: true
    publishedAt?: true
    kicker?: true
    title?: true
    description?: true
    role?: true
    timeline?: true
    overview?: true
    challengeIntro?: true
    solution?: true
    results?: true
    metaTitle?: true
    metaDescription?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseStudyMaxAggregateInputType = {
    id?: true
    slug?: true
    status?: true
    featured?: true
    publishedAt?: true
    kicker?: true
    title?: true
    description?: true
    role?: true
    timeline?: true
    overview?: true
    challengeIntro?: true
    solution?: true
    results?: true
    metaTitle?: true
    metaDescription?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseStudyCountAggregateInputType = {
    id?: true
    slug?: true
    status?: true
    featured?: true
    publishedAt?: true
    kicker?: true
    title?: true
    description?: true
    role?: true
    timeline?: true
    overview?: true
    challengeIntro?: true
    challengePoints?: true
    approach?: true
    solution?: true
    results?: true
    gallery?: true
    stats?: true
    metaTitle?: true
    metaDescription?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CaseStudyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseStudy to aggregate.
     */
    where?: CaseStudyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseStudies to fetch.
     */
    orderBy?: CaseStudyOrderByWithRelationInput | CaseStudyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseStudyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseStudies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseStudies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaseStudies
    **/
    _count?: true | CaseStudyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseStudyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseStudyMaxAggregateInputType
  }

  export type GetCaseStudyAggregateType<T extends CaseStudyAggregateArgs> = {
        [P in keyof T & keyof AggregateCaseStudy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaseStudy[P]>
      : GetScalarType<T[P], AggregateCaseStudy[P]>
  }




  export type CaseStudyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseStudyWhereInput
    orderBy?: CaseStudyOrderByWithAggregationInput | CaseStudyOrderByWithAggregationInput[]
    by: CaseStudyScalarFieldEnum[] | CaseStudyScalarFieldEnum
    having?: CaseStudyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseStudyCountAggregateInputType | true
    _min?: CaseStudyMinAggregateInputType
    _max?: CaseStudyMaxAggregateInputType
  }

  export type CaseStudyGroupByOutputType = {
    id: string
    slug: string
    status: $Enums.CaseStudyStatus
    featured: boolean
    publishedAt: Date | null
    kicker: string
    title: string
    description: string
    role: string
    timeline: string
    overview: string
    challengeIntro: string
    challengePoints: JsonValue
    approach: JsonValue
    solution: string
    results: string
    gallery: JsonValue
    stats: JsonValue
    metaTitle: string | null
    metaDescription: string | null
    createdAt: Date
    updatedAt: Date
    _count: CaseStudyCountAggregateOutputType | null
    _min: CaseStudyMinAggregateOutputType | null
    _max: CaseStudyMaxAggregateOutputType | null
  }

  type GetCaseStudyGroupByPayload<T extends CaseStudyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseStudyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseStudyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseStudyGroupByOutputType[P]>
            : GetScalarType<T[P], CaseStudyGroupByOutputType[P]>
        }
      >
    >


  export type CaseStudySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    publishedAt?: boolean
    kicker?: boolean
    title?: boolean
    description?: boolean
    role?: boolean
    timeline?: boolean
    overview?: boolean
    challengeIntro?: boolean
    challengePoints?: boolean
    approach?: boolean
    solution?: boolean
    results?: boolean
    gallery?: boolean
    stats?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["caseStudy"]>

  export type CaseStudySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    publishedAt?: boolean
    kicker?: boolean
    title?: boolean
    description?: boolean
    role?: boolean
    timeline?: boolean
    overview?: boolean
    challengeIntro?: boolean
    challengePoints?: boolean
    approach?: boolean
    solution?: boolean
    results?: boolean
    gallery?: boolean
    stats?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["caseStudy"]>

  export type CaseStudySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    publishedAt?: boolean
    kicker?: boolean
    title?: boolean
    description?: boolean
    role?: boolean
    timeline?: boolean
    overview?: boolean
    challengeIntro?: boolean
    challengePoints?: boolean
    approach?: boolean
    solution?: boolean
    results?: boolean
    gallery?: boolean
    stats?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["caseStudy"]>

  export type CaseStudySelectScalar = {
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    publishedAt?: boolean
    kicker?: boolean
    title?: boolean
    description?: boolean
    role?: boolean
    timeline?: boolean
    overview?: boolean
    challengeIntro?: boolean
    challengePoints?: boolean
    approach?: boolean
    solution?: boolean
    results?: boolean
    gallery?: boolean
    stats?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CaseStudyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "status" | "featured" | "publishedAt" | "kicker" | "title" | "description" | "role" | "timeline" | "overview" | "challengeIntro" | "challengePoints" | "approach" | "solution" | "results" | "gallery" | "stats" | "metaTitle" | "metaDescription" | "createdAt" | "updatedAt", ExtArgs["result"]["caseStudy"]>

  export type $CaseStudyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseStudy"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      status: $Enums.CaseStudyStatus
      featured: boolean
      publishedAt: Date | null
      kicker: string
      title: string
      description: string
      role: string
      timeline: string
      overview: string
      challengeIntro: string
      challengePoints: Prisma.JsonValue
      approach: Prisma.JsonValue
      solution: string
      results: string
      gallery: Prisma.JsonValue
      stats: Prisma.JsonValue
      metaTitle: string | null
      metaDescription: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["caseStudy"]>
    composites: {}
  }

  type CaseStudyGetPayload<S extends boolean | null | undefined | CaseStudyDefaultArgs> = $Result.GetResult<Prisma.$CaseStudyPayload, S>

  type CaseStudyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseStudyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseStudyCountAggregateInputType | true
    }

  export interface CaseStudyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaseStudy'], meta: { name: 'CaseStudy' } }
    /**
     * Find zero or one CaseStudy that matches the filter.
     * @param {CaseStudyFindUniqueArgs} args - Arguments to find a CaseStudy
     * @example
     * // Get one CaseStudy
     * const caseStudy = await prisma.caseStudy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseStudyFindUniqueArgs>(args: SelectSubset<T, CaseStudyFindUniqueArgs<ExtArgs>>): Prisma__CaseStudyClient<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaseStudy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseStudyFindUniqueOrThrowArgs} args - Arguments to find a CaseStudy
     * @example
     * // Get one CaseStudy
     * const caseStudy = await prisma.caseStudy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseStudyFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseStudyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseStudyClient<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseStudy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStudyFindFirstArgs} args - Arguments to find a CaseStudy
     * @example
     * // Get one CaseStudy
     * const caseStudy = await prisma.caseStudy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseStudyFindFirstArgs>(args?: SelectSubset<T, CaseStudyFindFirstArgs<ExtArgs>>): Prisma__CaseStudyClient<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseStudy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStudyFindFirstOrThrowArgs} args - Arguments to find a CaseStudy
     * @example
     * // Get one CaseStudy
     * const caseStudy = await prisma.caseStudy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseStudyFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseStudyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseStudyClient<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaseStudies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStudyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaseStudies
     * const caseStudies = await prisma.caseStudy.findMany()
     * 
     * // Get first 10 CaseStudies
     * const caseStudies = await prisma.caseStudy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseStudyWithIdOnly = await prisma.caseStudy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseStudyFindManyArgs>(args?: SelectSubset<T, CaseStudyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaseStudy.
     * @param {CaseStudyCreateArgs} args - Arguments to create a CaseStudy.
     * @example
     * // Create one CaseStudy
     * const CaseStudy = await prisma.caseStudy.create({
     *   data: {
     *     // ... data to create a CaseStudy
     *   }
     * })
     * 
     */
    create<T extends CaseStudyCreateArgs>(args: SelectSubset<T, CaseStudyCreateArgs<ExtArgs>>): Prisma__CaseStudyClient<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaseStudies.
     * @param {CaseStudyCreateManyArgs} args - Arguments to create many CaseStudies.
     * @example
     * // Create many CaseStudies
     * const caseStudy = await prisma.caseStudy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseStudyCreateManyArgs>(args?: SelectSubset<T, CaseStudyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaseStudies and returns the data saved in the database.
     * @param {CaseStudyCreateManyAndReturnArgs} args - Arguments to create many CaseStudies.
     * @example
     * // Create many CaseStudies
     * const caseStudy = await prisma.caseStudy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaseStudies and only return the `id`
     * const caseStudyWithIdOnly = await prisma.caseStudy.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseStudyCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseStudyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaseStudy.
     * @param {CaseStudyDeleteArgs} args - Arguments to delete one CaseStudy.
     * @example
     * // Delete one CaseStudy
     * const CaseStudy = await prisma.caseStudy.delete({
     *   where: {
     *     // ... filter to delete one CaseStudy
     *   }
     * })
     * 
     */
    delete<T extends CaseStudyDeleteArgs>(args: SelectSubset<T, CaseStudyDeleteArgs<ExtArgs>>): Prisma__CaseStudyClient<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaseStudy.
     * @param {CaseStudyUpdateArgs} args - Arguments to update one CaseStudy.
     * @example
     * // Update one CaseStudy
     * const caseStudy = await prisma.caseStudy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseStudyUpdateArgs>(args: SelectSubset<T, CaseStudyUpdateArgs<ExtArgs>>): Prisma__CaseStudyClient<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaseStudies.
     * @param {CaseStudyDeleteManyArgs} args - Arguments to filter CaseStudies to delete.
     * @example
     * // Delete a few CaseStudies
     * const { count } = await prisma.caseStudy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseStudyDeleteManyArgs>(args?: SelectSubset<T, CaseStudyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseStudies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStudyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaseStudies
     * const caseStudy = await prisma.caseStudy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseStudyUpdateManyArgs>(args: SelectSubset<T, CaseStudyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseStudies and returns the data updated in the database.
     * @param {CaseStudyUpdateManyAndReturnArgs} args - Arguments to update many CaseStudies.
     * @example
     * // Update many CaseStudies
     * const caseStudy = await prisma.caseStudy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaseStudies and only return the `id`
     * const caseStudyWithIdOnly = await prisma.caseStudy.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CaseStudyUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseStudyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaseStudy.
     * @param {CaseStudyUpsertArgs} args - Arguments to update or create a CaseStudy.
     * @example
     * // Update or create a CaseStudy
     * const caseStudy = await prisma.caseStudy.upsert({
     *   create: {
     *     // ... data to create a CaseStudy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaseStudy we want to update
     *   }
     * })
     */
    upsert<T extends CaseStudyUpsertArgs>(args: SelectSubset<T, CaseStudyUpsertArgs<ExtArgs>>): Prisma__CaseStudyClient<$Result.GetResult<Prisma.$CaseStudyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaseStudies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStudyCountArgs} args - Arguments to filter CaseStudies to count.
     * @example
     * // Count the number of CaseStudies
     * const count = await prisma.caseStudy.count({
     *   where: {
     *     // ... the filter for the CaseStudies we want to count
     *   }
     * })
    **/
    count<T extends CaseStudyCountArgs>(
      args?: Subset<T, CaseStudyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseStudyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaseStudy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStudyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CaseStudyAggregateArgs>(args: Subset<T, CaseStudyAggregateArgs>): Prisma.PrismaPromise<GetCaseStudyAggregateType<T>>

    /**
     * Group by CaseStudy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStudyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CaseStudyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseStudyGroupByArgs['orderBy'] }
        : { orderBy?: CaseStudyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CaseStudyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseStudyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaseStudy model
   */
  readonly fields: CaseStudyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaseStudy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseStudyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CaseStudy model
   */
  interface CaseStudyFieldRefs {
    readonly id: FieldRef<"CaseStudy", 'String'>
    readonly slug: FieldRef<"CaseStudy", 'String'>
    readonly status: FieldRef<"CaseStudy", 'CaseStudyStatus'>
    readonly featured: FieldRef<"CaseStudy", 'Boolean'>
    readonly publishedAt: FieldRef<"CaseStudy", 'DateTime'>
    readonly kicker: FieldRef<"CaseStudy", 'String'>
    readonly title: FieldRef<"CaseStudy", 'String'>
    readonly description: FieldRef<"CaseStudy", 'String'>
    readonly role: FieldRef<"CaseStudy", 'String'>
    readonly timeline: FieldRef<"CaseStudy", 'String'>
    readonly overview: FieldRef<"CaseStudy", 'String'>
    readonly challengeIntro: FieldRef<"CaseStudy", 'String'>
    readonly challengePoints: FieldRef<"CaseStudy", 'Json'>
    readonly approach: FieldRef<"CaseStudy", 'Json'>
    readonly solution: FieldRef<"CaseStudy", 'String'>
    readonly results: FieldRef<"CaseStudy", 'String'>
    readonly gallery: FieldRef<"CaseStudy", 'Json'>
    readonly stats: FieldRef<"CaseStudy", 'Json'>
    readonly metaTitle: FieldRef<"CaseStudy", 'String'>
    readonly metaDescription: FieldRef<"CaseStudy", 'String'>
    readonly createdAt: FieldRef<"CaseStudy", 'DateTime'>
    readonly updatedAt: FieldRef<"CaseStudy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CaseStudy findUnique
   */
  export type CaseStudyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * Filter, which CaseStudy to fetch.
     */
    where: CaseStudyWhereUniqueInput
  }

  /**
   * CaseStudy findUniqueOrThrow
   */
  export type CaseStudyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * Filter, which CaseStudy to fetch.
     */
    where: CaseStudyWhereUniqueInput
  }

  /**
   * CaseStudy findFirst
   */
  export type CaseStudyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * Filter, which CaseStudy to fetch.
     */
    where?: CaseStudyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseStudies to fetch.
     */
    orderBy?: CaseStudyOrderByWithRelationInput | CaseStudyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseStudies.
     */
    cursor?: CaseStudyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseStudies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseStudies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseStudies.
     */
    distinct?: CaseStudyScalarFieldEnum | CaseStudyScalarFieldEnum[]
  }

  /**
   * CaseStudy findFirstOrThrow
   */
  export type CaseStudyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * Filter, which CaseStudy to fetch.
     */
    where?: CaseStudyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseStudies to fetch.
     */
    orderBy?: CaseStudyOrderByWithRelationInput | CaseStudyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseStudies.
     */
    cursor?: CaseStudyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseStudies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseStudies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseStudies.
     */
    distinct?: CaseStudyScalarFieldEnum | CaseStudyScalarFieldEnum[]
  }

  /**
   * CaseStudy findMany
   */
  export type CaseStudyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * Filter, which CaseStudies to fetch.
     */
    where?: CaseStudyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseStudies to fetch.
     */
    orderBy?: CaseStudyOrderByWithRelationInput | CaseStudyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaseStudies.
     */
    cursor?: CaseStudyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseStudies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseStudies.
     */
    skip?: number
    distinct?: CaseStudyScalarFieldEnum | CaseStudyScalarFieldEnum[]
  }

  /**
   * CaseStudy create
   */
  export type CaseStudyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * The data needed to create a CaseStudy.
     */
    data: XOR<CaseStudyCreateInput, CaseStudyUncheckedCreateInput>
  }

  /**
   * CaseStudy createMany
   */
  export type CaseStudyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaseStudies.
     */
    data: CaseStudyCreateManyInput | CaseStudyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaseStudy createManyAndReturn
   */
  export type CaseStudyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * The data used to create many CaseStudies.
     */
    data: CaseStudyCreateManyInput | CaseStudyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaseStudy update
   */
  export type CaseStudyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * The data needed to update a CaseStudy.
     */
    data: XOR<CaseStudyUpdateInput, CaseStudyUncheckedUpdateInput>
    /**
     * Choose, which CaseStudy to update.
     */
    where: CaseStudyWhereUniqueInput
  }

  /**
   * CaseStudy updateMany
   */
  export type CaseStudyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaseStudies.
     */
    data: XOR<CaseStudyUpdateManyMutationInput, CaseStudyUncheckedUpdateManyInput>
    /**
     * Filter which CaseStudies to update
     */
    where?: CaseStudyWhereInput
    /**
     * Limit how many CaseStudies to update.
     */
    limit?: number
  }

  /**
   * CaseStudy updateManyAndReturn
   */
  export type CaseStudyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * The data used to update CaseStudies.
     */
    data: XOR<CaseStudyUpdateManyMutationInput, CaseStudyUncheckedUpdateManyInput>
    /**
     * Filter which CaseStudies to update
     */
    where?: CaseStudyWhereInput
    /**
     * Limit how many CaseStudies to update.
     */
    limit?: number
  }

  /**
   * CaseStudy upsert
   */
  export type CaseStudyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * The filter to search for the CaseStudy to update in case it exists.
     */
    where: CaseStudyWhereUniqueInput
    /**
     * In case the CaseStudy found by the `where` argument doesn't exist, create a new CaseStudy with this data.
     */
    create: XOR<CaseStudyCreateInput, CaseStudyUncheckedCreateInput>
    /**
     * In case the CaseStudy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseStudyUpdateInput, CaseStudyUncheckedUpdateInput>
  }

  /**
   * CaseStudy delete
   */
  export type CaseStudyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
    /**
     * Filter which CaseStudy to delete.
     */
    where: CaseStudyWhereUniqueInput
  }

  /**
   * CaseStudy deleteMany
   */
  export type CaseStudyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseStudies to delete
     */
    where?: CaseStudyWhereInput
    /**
     * Limit how many CaseStudies to delete.
     */
    limit?: number
  }

  /**
   * CaseStudy without action
   */
  export type CaseStudyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStudy
     */
    select?: CaseStudySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStudy
     */
    omit?: CaseStudyOmit<ExtArgs> | null
  }


  /**
   * Model ContactSubmission
   */

  export type AggregateContactSubmission = {
    _count: ContactSubmissionCountAggregateOutputType | null
    _min: ContactSubmissionMinAggregateOutputType | null
    _max: ContactSubmissionMaxAggregateOutputType | null
  }

  export type ContactSubmissionMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    selectedPlan: string | null
    message: string | null
    gdprAccepted: boolean | null
    status: $Enums.ContactStatus | null
    contractSigned: boolean | null
    sourcePage: string | null
    userAgent: string | null
    ipAddress: string | null
    sessionId: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    utmContent: string | null
    utmTerm: string | null
    consentAnalytics: boolean | null
    emailSent: boolean | null
    emailError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactSubmissionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    selectedPlan: string | null
    message: string | null
    gdprAccepted: boolean | null
    status: $Enums.ContactStatus | null
    contractSigned: boolean | null
    sourcePage: string | null
    userAgent: string | null
    ipAddress: string | null
    sessionId: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    utmContent: string | null
    utmTerm: string | null
    consentAnalytics: boolean | null
    emailSent: boolean | null
    emailError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactSubmissionCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    selectedPlan: number
    message: number
    gdprAccepted: number
    status: number
    contractSigned: number
    sourcePage: number
    userAgent: number
    ipAddress: number
    sessionId: number
    utmSource: number
    utmMedium: number
    utmCampaign: number
    utmContent: number
    utmTerm: number
    consentAnalytics: number
    emailSent: number
    emailError: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContactSubmissionMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    selectedPlan?: true
    message?: true
    gdprAccepted?: true
    status?: true
    contractSigned?: true
    sourcePage?: true
    userAgent?: true
    ipAddress?: true
    sessionId?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    utmContent?: true
    utmTerm?: true
    consentAnalytics?: true
    emailSent?: true
    emailError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactSubmissionMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    selectedPlan?: true
    message?: true
    gdprAccepted?: true
    status?: true
    contractSigned?: true
    sourcePage?: true
    userAgent?: true
    ipAddress?: true
    sessionId?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    utmContent?: true
    utmTerm?: true
    consentAnalytics?: true
    emailSent?: true
    emailError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactSubmissionCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    selectedPlan?: true
    message?: true
    gdprAccepted?: true
    status?: true
    contractSigned?: true
    sourcePage?: true
    userAgent?: true
    ipAddress?: true
    sessionId?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    utmContent?: true
    utmTerm?: true
    consentAnalytics?: true
    emailSent?: true
    emailError?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactSubmission to aggregate.
     */
    where?: ContactSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactSubmissions to fetch.
     */
    orderBy?: ContactSubmissionOrderByWithRelationInput | ContactSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactSubmissions
    **/
    _count?: true | ContactSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactSubmissionMaxAggregateInputType
  }

  export type GetContactSubmissionAggregateType<T extends ContactSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateContactSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactSubmission[P]>
      : GetScalarType<T[P], AggregateContactSubmission[P]>
  }




  export type ContactSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactSubmissionWhereInput
    orderBy?: ContactSubmissionOrderByWithAggregationInput | ContactSubmissionOrderByWithAggregationInput[]
    by: ContactSubmissionScalarFieldEnum[] | ContactSubmissionScalarFieldEnum
    having?: ContactSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactSubmissionCountAggregateInputType | true
    _min?: ContactSubmissionMinAggregateInputType
    _max?: ContactSubmissionMaxAggregateInputType
  }

  export type ContactSubmissionGroupByOutputType = {
    id: string
    name: string
    email: string
    phone: string | null
    selectedPlan: string | null
    message: string
    gdprAccepted: boolean
    status: $Enums.ContactStatus
    contractSigned: boolean
    sourcePage: string | null
    userAgent: string | null
    ipAddress: string | null
    sessionId: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    utmContent: string | null
    utmTerm: string | null
    consentAnalytics: boolean
    emailSent: boolean
    emailError: string | null
    createdAt: Date
    updatedAt: Date
    _count: ContactSubmissionCountAggregateOutputType | null
    _min: ContactSubmissionMinAggregateOutputType | null
    _max: ContactSubmissionMaxAggregateOutputType | null
  }

  type GetContactSubmissionGroupByPayload<T extends ContactSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], ContactSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type ContactSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    selectedPlan?: boolean
    message?: boolean
    gdprAccepted?: boolean
    status?: boolean
    contractSigned?: boolean
    sourcePage?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    sessionId?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmContent?: boolean
    utmTerm?: boolean
    consentAnalytics?: boolean
    emailSent?: boolean
    emailError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contactSubmission"]>

  export type ContactSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    selectedPlan?: boolean
    message?: boolean
    gdprAccepted?: boolean
    status?: boolean
    contractSigned?: boolean
    sourcePage?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    sessionId?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmContent?: boolean
    utmTerm?: boolean
    consentAnalytics?: boolean
    emailSent?: boolean
    emailError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contactSubmission"]>

  export type ContactSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    selectedPlan?: boolean
    message?: boolean
    gdprAccepted?: boolean
    status?: boolean
    contractSigned?: boolean
    sourcePage?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    sessionId?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmContent?: boolean
    utmTerm?: boolean
    consentAnalytics?: boolean
    emailSent?: boolean
    emailError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contactSubmission"]>

  export type ContactSubmissionSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    selectedPlan?: boolean
    message?: boolean
    gdprAccepted?: boolean
    status?: boolean
    contractSigned?: boolean
    sourcePage?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    sessionId?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmContent?: boolean
    utmTerm?: boolean
    consentAnalytics?: boolean
    emailSent?: boolean
    emailError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContactSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "selectedPlan" | "message" | "gdprAccepted" | "status" | "contractSigned" | "sourcePage" | "userAgent" | "ipAddress" | "sessionId" | "utmSource" | "utmMedium" | "utmCampaign" | "utmContent" | "utmTerm" | "consentAnalytics" | "emailSent" | "emailError" | "createdAt" | "updatedAt", ExtArgs["result"]["contactSubmission"]>

  export type $ContactSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactSubmission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone: string | null
      selectedPlan: string | null
      message: string
      gdprAccepted: boolean
      status: $Enums.ContactStatus
      contractSigned: boolean
      sourcePage: string | null
      userAgent: string | null
      ipAddress: string | null
      sessionId: string | null
      utmSource: string | null
      utmMedium: string | null
      utmCampaign: string | null
      utmContent: string | null
      utmTerm: string | null
      consentAnalytics: boolean
      emailSent: boolean
      emailError: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contactSubmission"]>
    composites: {}
  }

  type ContactSubmissionGetPayload<S extends boolean | null | undefined | ContactSubmissionDefaultArgs> = $Result.GetResult<Prisma.$ContactSubmissionPayload, S>

  type ContactSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactSubmissionCountAggregateInputType | true
    }

  export interface ContactSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactSubmission'], meta: { name: 'ContactSubmission' } }
    /**
     * Find zero or one ContactSubmission that matches the filter.
     * @param {ContactSubmissionFindUniqueArgs} args - Arguments to find a ContactSubmission
     * @example
     * // Get one ContactSubmission
     * const contactSubmission = await prisma.contactSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactSubmissionFindUniqueArgs>(args: SelectSubset<T, ContactSubmissionFindUniqueArgs<ExtArgs>>): Prisma__ContactSubmissionClient<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactSubmissionFindUniqueOrThrowArgs} args - Arguments to find a ContactSubmission
     * @example
     * // Get one ContactSubmission
     * const contactSubmission = await prisma.contactSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactSubmissionClient<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactSubmissionFindFirstArgs} args - Arguments to find a ContactSubmission
     * @example
     * // Get one ContactSubmission
     * const contactSubmission = await prisma.contactSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactSubmissionFindFirstArgs>(args?: SelectSubset<T, ContactSubmissionFindFirstArgs<ExtArgs>>): Prisma__ContactSubmissionClient<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactSubmissionFindFirstOrThrowArgs} args - Arguments to find a ContactSubmission
     * @example
     * // Get one ContactSubmission
     * const contactSubmission = await prisma.contactSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactSubmissionClient<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactSubmissions
     * const contactSubmissions = await prisma.contactSubmission.findMany()
     * 
     * // Get first 10 ContactSubmissions
     * const contactSubmissions = await prisma.contactSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactSubmissionWithIdOnly = await prisma.contactSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactSubmissionFindManyArgs>(args?: SelectSubset<T, ContactSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactSubmission.
     * @param {ContactSubmissionCreateArgs} args - Arguments to create a ContactSubmission.
     * @example
     * // Create one ContactSubmission
     * const ContactSubmission = await prisma.contactSubmission.create({
     *   data: {
     *     // ... data to create a ContactSubmission
     *   }
     * })
     * 
     */
    create<T extends ContactSubmissionCreateArgs>(args: SelectSubset<T, ContactSubmissionCreateArgs<ExtArgs>>): Prisma__ContactSubmissionClient<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactSubmissions.
     * @param {ContactSubmissionCreateManyArgs} args - Arguments to create many ContactSubmissions.
     * @example
     * // Create many ContactSubmissions
     * const contactSubmission = await prisma.contactSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactSubmissionCreateManyArgs>(args?: SelectSubset<T, ContactSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactSubmissions and returns the data saved in the database.
     * @param {ContactSubmissionCreateManyAndReturnArgs} args - Arguments to create many ContactSubmissions.
     * @example
     * // Create many ContactSubmissions
     * const contactSubmission = await prisma.contactSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactSubmissions and only return the `id`
     * const contactSubmissionWithIdOnly = await prisma.contactSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContactSubmission.
     * @param {ContactSubmissionDeleteArgs} args - Arguments to delete one ContactSubmission.
     * @example
     * // Delete one ContactSubmission
     * const ContactSubmission = await prisma.contactSubmission.delete({
     *   where: {
     *     // ... filter to delete one ContactSubmission
     *   }
     * })
     * 
     */
    delete<T extends ContactSubmissionDeleteArgs>(args: SelectSubset<T, ContactSubmissionDeleteArgs<ExtArgs>>): Prisma__ContactSubmissionClient<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactSubmission.
     * @param {ContactSubmissionUpdateArgs} args - Arguments to update one ContactSubmission.
     * @example
     * // Update one ContactSubmission
     * const contactSubmission = await prisma.contactSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactSubmissionUpdateArgs>(args: SelectSubset<T, ContactSubmissionUpdateArgs<ExtArgs>>): Prisma__ContactSubmissionClient<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactSubmissions.
     * @param {ContactSubmissionDeleteManyArgs} args - Arguments to filter ContactSubmissions to delete.
     * @example
     * // Delete a few ContactSubmissions
     * const { count } = await prisma.contactSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactSubmissionDeleteManyArgs>(args?: SelectSubset<T, ContactSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactSubmissions
     * const contactSubmission = await prisma.contactSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactSubmissionUpdateManyArgs>(args: SelectSubset<T, ContactSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactSubmissions and returns the data updated in the database.
     * @param {ContactSubmissionUpdateManyAndReturnArgs} args - Arguments to update many ContactSubmissions.
     * @example
     * // Update many ContactSubmissions
     * const contactSubmission = await prisma.contactSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContactSubmissions and only return the `id`
     * const contactSubmissionWithIdOnly = await prisma.contactSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContactSubmission.
     * @param {ContactSubmissionUpsertArgs} args - Arguments to update or create a ContactSubmission.
     * @example
     * // Update or create a ContactSubmission
     * const contactSubmission = await prisma.contactSubmission.upsert({
     *   create: {
     *     // ... data to create a ContactSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactSubmission we want to update
     *   }
     * })
     */
    upsert<T extends ContactSubmissionUpsertArgs>(args: SelectSubset<T, ContactSubmissionUpsertArgs<ExtArgs>>): Prisma__ContactSubmissionClient<$Result.GetResult<Prisma.$ContactSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContactSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactSubmissionCountArgs} args - Arguments to filter ContactSubmissions to count.
     * @example
     * // Count the number of ContactSubmissions
     * const count = await prisma.contactSubmission.count({
     *   where: {
     *     // ... the filter for the ContactSubmissions we want to count
     *   }
     * })
    **/
    count<T extends ContactSubmissionCountArgs>(
      args?: Subset<T, ContactSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactSubmissionAggregateArgs>(args: Subset<T, ContactSubmissionAggregateArgs>): Prisma.PrismaPromise<GetContactSubmissionAggregateType<T>>

    /**
     * Group by ContactSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: ContactSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactSubmission model
   */
  readonly fields: ContactSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactSubmission model
   */
  interface ContactSubmissionFieldRefs {
    readonly id: FieldRef<"ContactSubmission", 'String'>
    readonly name: FieldRef<"ContactSubmission", 'String'>
    readonly email: FieldRef<"ContactSubmission", 'String'>
    readonly phone: FieldRef<"ContactSubmission", 'String'>
    readonly selectedPlan: FieldRef<"ContactSubmission", 'String'>
    readonly message: FieldRef<"ContactSubmission", 'String'>
    readonly gdprAccepted: FieldRef<"ContactSubmission", 'Boolean'>
    readonly status: FieldRef<"ContactSubmission", 'ContactStatus'>
    readonly contractSigned: FieldRef<"ContactSubmission", 'Boolean'>
    readonly sourcePage: FieldRef<"ContactSubmission", 'String'>
    readonly userAgent: FieldRef<"ContactSubmission", 'String'>
    readonly ipAddress: FieldRef<"ContactSubmission", 'String'>
    readonly sessionId: FieldRef<"ContactSubmission", 'String'>
    readonly utmSource: FieldRef<"ContactSubmission", 'String'>
    readonly utmMedium: FieldRef<"ContactSubmission", 'String'>
    readonly utmCampaign: FieldRef<"ContactSubmission", 'String'>
    readonly utmContent: FieldRef<"ContactSubmission", 'String'>
    readonly utmTerm: FieldRef<"ContactSubmission", 'String'>
    readonly consentAnalytics: FieldRef<"ContactSubmission", 'Boolean'>
    readonly emailSent: FieldRef<"ContactSubmission", 'Boolean'>
    readonly emailError: FieldRef<"ContactSubmission", 'String'>
    readonly createdAt: FieldRef<"ContactSubmission", 'DateTime'>
    readonly updatedAt: FieldRef<"ContactSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContactSubmission findUnique
   */
  export type ContactSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which ContactSubmission to fetch.
     */
    where: ContactSubmissionWhereUniqueInput
  }

  /**
   * ContactSubmission findUniqueOrThrow
   */
  export type ContactSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which ContactSubmission to fetch.
     */
    where: ContactSubmissionWhereUniqueInput
  }

  /**
   * ContactSubmission findFirst
   */
  export type ContactSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which ContactSubmission to fetch.
     */
    where?: ContactSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactSubmissions to fetch.
     */
    orderBy?: ContactSubmissionOrderByWithRelationInput | ContactSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactSubmissions.
     */
    cursor?: ContactSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactSubmissions.
     */
    distinct?: ContactSubmissionScalarFieldEnum | ContactSubmissionScalarFieldEnum[]
  }

  /**
   * ContactSubmission findFirstOrThrow
   */
  export type ContactSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which ContactSubmission to fetch.
     */
    where?: ContactSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactSubmissions to fetch.
     */
    orderBy?: ContactSubmissionOrderByWithRelationInput | ContactSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactSubmissions.
     */
    cursor?: ContactSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactSubmissions.
     */
    distinct?: ContactSubmissionScalarFieldEnum | ContactSubmissionScalarFieldEnum[]
  }

  /**
   * ContactSubmission findMany
   */
  export type ContactSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which ContactSubmissions to fetch.
     */
    where?: ContactSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactSubmissions to fetch.
     */
    orderBy?: ContactSubmissionOrderByWithRelationInput | ContactSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactSubmissions.
     */
    cursor?: ContactSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactSubmissions.
     */
    skip?: number
    distinct?: ContactSubmissionScalarFieldEnum | ContactSubmissionScalarFieldEnum[]
  }

  /**
   * ContactSubmission create
   */
  export type ContactSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to create a ContactSubmission.
     */
    data: XOR<ContactSubmissionCreateInput, ContactSubmissionUncheckedCreateInput>
  }

  /**
   * ContactSubmission createMany
   */
  export type ContactSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactSubmissions.
     */
    data: ContactSubmissionCreateManyInput | ContactSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactSubmission createManyAndReturn
   */
  export type ContactSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many ContactSubmissions.
     */
    data: ContactSubmissionCreateManyInput | ContactSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactSubmission update
   */
  export type ContactSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to update a ContactSubmission.
     */
    data: XOR<ContactSubmissionUpdateInput, ContactSubmissionUncheckedUpdateInput>
    /**
     * Choose, which ContactSubmission to update.
     */
    where: ContactSubmissionWhereUniqueInput
  }

  /**
   * ContactSubmission updateMany
   */
  export type ContactSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactSubmissions.
     */
    data: XOR<ContactSubmissionUpdateManyMutationInput, ContactSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which ContactSubmissions to update
     */
    where?: ContactSubmissionWhereInput
    /**
     * Limit how many ContactSubmissions to update.
     */
    limit?: number
  }

  /**
   * ContactSubmission updateManyAndReturn
   */
  export type ContactSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update ContactSubmissions.
     */
    data: XOR<ContactSubmissionUpdateManyMutationInput, ContactSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which ContactSubmissions to update
     */
    where?: ContactSubmissionWhereInput
    /**
     * Limit how many ContactSubmissions to update.
     */
    limit?: number
  }

  /**
   * ContactSubmission upsert
   */
  export type ContactSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * The filter to search for the ContactSubmission to update in case it exists.
     */
    where: ContactSubmissionWhereUniqueInput
    /**
     * In case the ContactSubmission found by the `where` argument doesn't exist, create a new ContactSubmission with this data.
     */
    create: XOR<ContactSubmissionCreateInput, ContactSubmissionUncheckedCreateInput>
    /**
     * In case the ContactSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactSubmissionUpdateInput, ContactSubmissionUncheckedUpdateInput>
  }

  /**
   * ContactSubmission delete
   */
  export type ContactSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
    /**
     * Filter which ContactSubmission to delete.
     */
    where: ContactSubmissionWhereUniqueInput
  }

  /**
   * ContactSubmission deleteMany
   */
  export type ContactSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactSubmissions to delete
     */
    where?: ContactSubmissionWhereInput
    /**
     * Limit how many ContactSubmissions to delete.
     */
    limit?: number
  }

  /**
   * ContactSubmission without action
   */
  export type ContactSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactSubmission
     */
    select?: ContactSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactSubmission
     */
    omit?: ContactSubmissionOmit<ExtArgs> | null
  }


  /**
   * Model AnalyticsSession
   */

  export type AggregateAnalyticsSession = {
    _count: AnalyticsSessionCountAggregateOutputType | null
    _min: AnalyticsSessionMinAggregateOutputType | null
    _max: AnalyticsSessionMaxAggregateOutputType | null
  }

  export type AnalyticsSessionMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    consentAnalytics: boolean | null
    firstPath: string | null
    lastPath: string | null
    referrer: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    utmContent: string | null
    utmTerm: string | null
    deviceType: string | null
    browser: string | null
    ipHash: string | null
    userAgentHash: string | null
    startedAt: Date | null
    lastSeenAt: Date | null
    convertedAt: Date | null
  }

  export type AnalyticsSessionMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    consentAnalytics: boolean | null
    firstPath: string | null
    lastPath: string | null
    referrer: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    utmContent: string | null
    utmTerm: string | null
    deviceType: string | null
    browser: string | null
    ipHash: string | null
    userAgentHash: string | null
    startedAt: Date | null
    lastSeenAt: Date | null
    convertedAt: Date | null
  }

  export type AnalyticsSessionCountAggregateOutputType = {
    id: number
    sessionId: number
    consentAnalytics: number
    firstPath: number
    lastPath: number
    referrer: number
    utmSource: number
    utmMedium: number
    utmCampaign: number
    utmContent: number
    utmTerm: number
    deviceType: number
    browser: number
    ipHash: number
    userAgentHash: number
    startedAt: number
    lastSeenAt: number
    convertedAt: number
    _all: number
  }


  export type AnalyticsSessionMinAggregateInputType = {
    id?: true
    sessionId?: true
    consentAnalytics?: true
    firstPath?: true
    lastPath?: true
    referrer?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    utmContent?: true
    utmTerm?: true
    deviceType?: true
    browser?: true
    ipHash?: true
    userAgentHash?: true
    startedAt?: true
    lastSeenAt?: true
    convertedAt?: true
  }

  export type AnalyticsSessionMaxAggregateInputType = {
    id?: true
    sessionId?: true
    consentAnalytics?: true
    firstPath?: true
    lastPath?: true
    referrer?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    utmContent?: true
    utmTerm?: true
    deviceType?: true
    browser?: true
    ipHash?: true
    userAgentHash?: true
    startedAt?: true
    lastSeenAt?: true
    convertedAt?: true
  }

  export type AnalyticsSessionCountAggregateInputType = {
    id?: true
    sessionId?: true
    consentAnalytics?: true
    firstPath?: true
    lastPath?: true
    referrer?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    utmContent?: true
    utmTerm?: true
    deviceType?: true
    browser?: true
    ipHash?: true
    userAgentHash?: true
    startedAt?: true
    lastSeenAt?: true
    convertedAt?: true
    _all?: true
  }

  export type AnalyticsSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsSession to aggregate.
     */
    where?: AnalyticsSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsSessions to fetch.
     */
    orderBy?: AnalyticsSessionOrderByWithRelationInput | AnalyticsSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticsSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalyticsSessions
    **/
    _count?: true | AnalyticsSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticsSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticsSessionMaxAggregateInputType
  }

  export type GetAnalyticsSessionAggregateType<T extends AnalyticsSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalyticsSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalyticsSession[P]>
      : GetScalarType<T[P], AggregateAnalyticsSession[P]>
  }




  export type AnalyticsSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsSessionWhereInput
    orderBy?: AnalyticsSessionOrderByWithAggregationInput | AnalyticsSessionOrderByWithAggregationInput[]
    by: AnalyticsSessionScalarFieldEnum[] | AnalyticsSessionScalarFieldEnum
    having?: AnalyticsSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticsSessionCountAggregateInputType | true
    _min?: AnalyticsSessionMinAggregateInputType
    _max?: AnalyticsSessionMaxAggregateInputType
  }

  export type AnalyticsSessionGroupByOutputType = {
    id: string
    sessionId: string
    consentAnalytics: boolean
    firstPath: string | null
    lastPath: string | null
    referrer: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    utmContent: string | null
    utmTerm: string | null
    deviceType: string | null
    browser: string | null
    ipHash: string | null
    userAgentHash: string | null
    startedAt: Date
    lastSeenAt: Date
    convertedAt: Date | null
    _count: AnalyticsSessionCountAggregateOutputType | null
    _min: AnalyticsSessionMinAggregateOutputType | null
    _max: AnalyticsSessionMaxAggregateOutputType | null
  }

  type GetAnalyticsSessionGroupByPayload<T extends AnalyticsSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticsSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticsSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticsSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticsSessionGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticsSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    consentAnalytics?: boolean
    firstPath?: boolean
    lastPath?: boolean
    referrer?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmContent?: boolean
    utmTerm?: boolean
    deviceType?: boolean
    browser?: boolean
    ipHash?: boolean
    userAgentHash?: boolean
    startedAt?: boolean
    lastSeenAt?: boolean
    convertedAt?: boolean
    events?: boolean | AnalyticsSession$eventsArgs<ExtArgs>
    _count?: boolean | AnalyticsSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsSession"]>

  export type AnalyticsSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    consentAnalytics?: boolean
    firstPath?: boolean
    lastPath?: boolean
    referrer?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmContent?: boolean
    utmTerm?: boolean
    deviceType?: boolean
    browser?: boolean
    ipHash?: boolean
    userAgentHash?: boolean
    startedAt?: boolean
    lastSeenAt?: boolean
    convertedAt?: boolean
  }, ExtArgs["result"]["analyticsSession"]>

  export type AnalyticsSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    consentAnalytics?: boolean
    firstPath?: boolean
    lastPath?: boolean
    referrer?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmContent?: boolean
    utmTerm?: boolean
    deviceType?: boolean
    browser?: boolean
    ipHash?: boolean
    userAgentHash?: boolean
    startedAt?: boolean
    lastSeenAt?: boolean
    convertedAt?: boolean
  }, ExtArgs["result"]["analyticsSession"]>

  export type AnalyticsSessionSelectScalar = {
    id?: boolean
    sessionId?: boolean
    consentAnalytics?: boolean
    firstPath?: boolean
    lastPath?: boolean
    referrer?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmContent?: boolean
    utmTerm?: boolean
    deviceType?: boolean
    browser?: boolean
    ipHash?: boolean
    userAgentHash?: boolean
    startedAt?: boolean
    lastSeenAt?: boolean
    convertedAt?: boolean
  }

  export type AnalyticsSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "consentAnalytics" | "firstPath" | "lastPath" | "referrer" | "utmSource" | "utmMedium" | "utmCampaign" | "utmContent" | "utmTerm" | "deviceType" | "browser" | "ipHash" | "userAgentHash" | "startedAt" | "lastSeenAt" | "convertedAt", ExtArgs["result"]["analyticsSession"]>
  export type AnalyticsSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | AnalyticsSession$eventsArgs<ExtArgs>
    _count?: boolean | AnalyticsSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnalyticsSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AnalyticsSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AnalyticsSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalyticsSession"
    objects: {
      events: Prisma.$AnalyticsEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      consentAnalytics: boolean
      firstPath: string | null
      lastPath: string | null
      referrer: string | null
      utmSource: string | null
      utmMedium: string | null
      utmCampaign: string | null
      utmContent: string | null
      utmTerm: string | null
      deviceType: string | null
      browser: string | null
      ipHash: string | null
      userAgentHash: string | null
      startedAt: Date
      lastSeenAt: Date
      convertedAt: Date | null
    }, ExtArgs["result"]["analyticsSession"]>
    composites: {}
  }

  type AnalyticsSessionGetPayload<S extends boolean | null | undefined | AnalyticsSessionDefaultArgs> = $Result.GetResult<Prisma.$AnalyticsSessionPayload, S>

  type AnalyticsSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalyticsSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalyticsSessionCountAggregateInputType | true
    }

  export interface AnalyticsSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalyticsSession'], meta: { name: 'AnalyticsSession' } }
    /**
     * Find zero or one AnalyticsSession that matches the filter.
     * @param {AnalyticsSessionFindUniqueArgs} args - Arguments to find a AnalyticsSession
     * @example
     * // Get one AnalyticsSession
     * const analyticsSession = await prisma.analyticsSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticsSessionFindUniqueArgs>(args: SelectSubset<T, AnalyticsSessionFindUniqueArgs<ExtArgs>>): Prisma__AnalyticsSessionClient<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnalyticsSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalyticsSessionFindUniqueOrThrowArgs} args - Arguments to find a AnalyticsSession
     * @example
     * // Get one AnalyticsSession
     * const analyticsSession = await prisma.analyticsSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticsSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticsSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticsSessionClient<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSessionFindFirstArgs} args - Arguments to find a AnalyticsSession
     * @example
     * // Get one AnalyticsSession
     * const analyticsSession = await prisma.analyticsSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticsSessionFindFirstArgs>(args?: SelectSubset<T, AnalyticsSessionFindFirstArgs<ExtArgs>>): Prisma__AnalyticsSessionClient<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSessionFindFirstOrThrowArgs} args - Arguments to find a AnalyticsSession
     * @example
     * // Get one AnalyticsSession
     * const analyticsSession = await prisma.analyticsSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticsSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticsSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticsSessionClient<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnalyticsSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalyticsSessions
     * const analyticsSessions = await prisma.analyticsSession.findMany()
     * 
     * // Get first 10 AnalyticsSessions
     * const analyticsSessions = await prisma.analyticsSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticsSessionWithIdOnly = await prisma.analyticsSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticsSessionFindManyArgs>(args?: SelectSubset<T, AnalyticsSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnalyticsSession.
     * @param {AnalyticsSessionCreateArgs} args - Arguments to create a AnalyticsSession.
     * @example
     * // Create one AnalyticsSession
     * const AnalyticsSession = await prisma.analyticsSession.create({
     *   data: {
     *     // ... data to create a AnalyticsSession
     *   }
     * })
     * 
     */
    create<T extends AnalyticsSessionCreateArgs>(args: SelectSubset<T, AnalyticsSessionCreateArgs<ExtArgs>>): Prisma__AnalyticsSessionClient<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnalyticsSessions.
     * @param {AnalyticsSessionCreateManyArgs} args - Arguments to create many AnalyticsSessions.
     * @example
     * // Create many AnalyticsSessions
     * const analyticsSession = await prisma.analyticsSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticsSessionCreateManyArgs>(args?: SelectSubset<T, AnalyticsSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalyticsSessions and returns the data saved in the database.
     * @param {AnalyticsSessionCreateManyAndReturnArgs} args - Arguments to create many AnalyticsSessions.
     * @example
     * // Create many AnalyticsSessions
     * const analyticsSession = await prisma.analyticsSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalyticsSessions and only return the `id`
     * const analyticsSessionWithIdOnly = await prisma.analyticsSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalyticsSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalyticsSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnalyticsSession.
     * @param {AnalyticsSessionDeleteArgs} args - Arguments to delete one AnalyticsSession.
     * @example
     * // Delete one AnalyticsSession
     * const AnalyticsSession = await prisma.analyticsSession.delete({
     *   where: {
     *     // ... filter to delete one AnalyticsSession
     *   }
     * })
     * 
     */
    delete<T extends AnalyticsSessionDeleteArgs>(args: SelectSubset<T, AnalyticsSessionDeleteArgs<ExtArgs>>): Prisma__AnalyticsSessionClient<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnalyticsSession.
     * @param {AnalyticsSessionUpdateArgs} args - Arguments to update one AnalyticsSession.
     * @example
     * // Update one AnalyticsSession
     * const analyticsSession = await prisma.analyticsSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticsSessionUpdateArgs>(args: SelectSubset<T, AnalyticsSessionUpdateArgs<ExtArgs>>): Prisma__AnalyticsSessionClient<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnalyticsSessions.
     * @param {AnalyticsSessionDeleteManyArgs} args - Arguments to filter AnalyticsSessions to delete.
     * @example
     * // Delete a few AnalyticsSessions
     * const { count } = await prisma.analyticsSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticsSessionDeleteManyArgs>(args?: SelectSubset<T, AnalyticsSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalyticsSessions
     * const analyticsSession = await prisma.analyticsSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticsSessionUpdateManyArgs>(args: SelectSubset<T, AnalyticsSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsSessions and returns the data updated in the database.
     * @param {AnalyticsSessionUpdateManyAndReturnArgs} args - Arguments to update many AnalyticsSessions.
     * @example
     * // Update many AnalyticsSessions
     * const analyticsSession = await prisma.analyticsSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnalyticsSessions and only return the `id`
     * const analyticsSessionWithIdOnly = await prisma.analyticsSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalyticsSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalyticsSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnalyticsSession.
     * @param {AnalyticsSessionUpsertArgs} args - Arguments to update or create a AnalyticsSession.
     * @example
     * // Update or create a AnalyticsSession
     * const analyticsSession = await prisma.analyticsSession.upsert({
     *   create: {
     *     // ... data to create a AnalyticsSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalyticsSession we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticsSessionUpsertArgs>(args: SelectSubset<T, AnalyticsSessionUpsertArgs<ExtArgs>>): Prisma__AnalyticsSessionClient<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnalyticsSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSessionCountArgs} args - Arguments to filter AnalyticsSessions to count.
     * @example
     * // Count the number of AnalyticsSessions
     * const count = await prisma.analyticsSession.count({
     *   where: {
     *     // ... the filter for the AnalyticsSessions we want to count
     *   }
     * })
    **/
    count<T extends AnalyticsSessionCountArgs>(
      args?: Subset<T, AnalyticsSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticsSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalyticsSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalyticsSessionAggregateArgs>(args: Subset<T, AnalyticsSessionAggregateArgs>): Prisma.PrismaPromise<GetAnalyticsSessionAggregateType<T>>

    /**
     * Group by AnalyticsSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalyticsSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticsSessionGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticsSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalyticsSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticsSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalyticsSession model
   */
  readonly fields: AnalyticsSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalyticsSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticsSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends AnalyticsSession$eventsArgs<ExtArgs> = {}>(args?: Subset<T, AnalyticsSession$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnalyticsSession model
   */
  interface AnalyticsSessionFieldRefs {
    readonly id: FieldRef<"AnalyticsSession", 'String'>
    readonly sessionId: FieldRef<"AnalyticsSession", 'String'>
    readonly consentAnalytics: FieldRef<"AnalyticsSession", 'Boolean'>
    readonly firstPath: FieldRef<"AnalyticsSession", 'String'>
    readonly lastPath: FieldRef<"AnalyticsSession", 'String'>
    readonly referrer: FieldRef<"AnalyticsSession", 'String'>
    readonly utmSource: FieldRef<"AnalyticsSession", 'String'>
    readonly utmMedium: FieldRef<"AnalyticsSession", 'String'>
    readonly utmCampaign: FieldRef<"AnalyticsSession", 'String'>
    readonly utmContent: FieldRef<"AnalyticsSession", 'String'>
    readonly utmTerm: FieldRef<"AnalyticsSession", 'String'>
    readonly deviceType: FieldRef<"AnalyticsSession", 'String'>
    readonly browser: FieldRef<"AnalyticsSession", 'String'>
    readonly ipHash: FieldRef<"AnalyticsSession", 'String'>
    readonly userAgentHash: FieldRef<"AnalyticsSession", 'String'>
    readonly startedAt: FieldRef<"AnalyticsSession", 'DateTime'>
    readonly lastSeenAt: FieldRef<"AnalyticsSession", 'DateTime'>
    readonly convertedAt: FieldRef<"AnalyticsSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalyticsSession findUnique
   */
  export type AnalyticsSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsSession to fetch.
     */
    where: AnalyticsSessionWhereUniqueInput
  }

  /**
   * AnalyticsSession findUniqueOrThrow
   */
  export type AnalyticsSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsSession to fetch.
     */
    where: AnalyticsSessionWhereUniqueInput
  }

  /**
   * AnalyticsSession findFirst
   */
  export type AnalyticsSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsSession to fetch.
     */
    where?: AnalyticsSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsSessions to fetch.
     */
    orderBy?: AnalyticsSessionOrderByWithRelationInput | AnalyticsSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsSessions.
     */
    cursor?: AnalyticsSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsSessions.
     */
    distinct?: AnalyticsSessionScalarFieldEnum | AnalyticsSessionScalarFieldEnum[]
  }

  /**
   * AnalyticsSession findFirstOrThrow
   */
  export type AnalyticsSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsSession to fetch.
     */
    where?: AnalyticsSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsSessions to fetch.
     */
    orderBy?: AnalyticsSessionOrderByWithRelationInput | AnalyticsSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsSessions.
     */
    cursor?: AnalyticsSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsSessions.
     */
    distinct?: AnalyticsSessionScalarFieldEnum | AnalyticsSessionScalarFieldEnum[]
  }

  /**
   * AnalyticsSession findMany
   */
  export type AnalyticsSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsSessions to fetch.
     */
    where?: AnalyticsSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsSessions to fetch.
     */
    orderBy?: AnalyticsSessionOrderByWithRelationInput | AnalyticsSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalyticsSessions.
     */
    cursor?: AnalyticsSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsSessions.
     */
    skip?: number
    distinct?: AnalyticsSessionScalarFieldEnum | AnalyticsSessionScalarFieldEnum[]
  }

  /**
   * AnalyticsSession create
   */
  export type AnalyticsSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AnalyticsSession.
     */
    data: XOR<AnalyticsSessionCreateInput, AnalyticsSessionUncheckedCreateInput>
  }

  /**
   * AnalyticsSession createMany
   */
  export type AnalyticsSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalyticsSessions.
     */
    data: AnalyticsSessionCreateManyInput | AnalyticsSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticsSession createManyAndReturn
   */
  export type AnalyticsSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * The data used to create many AnalyticsSessions.
     */
    data: AnalyticsSessionCreateManyInput | AnalyticsSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticsSession update
   */
  export type AnalyticsSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AnalyticsSession.
     */
    data: XOR<AnalyticsSessionUpdateInput, AnalyticsSessionUncheckedUpdateInput>
    /**
     * Choose, which AnalyticsSession to update.
     */
    where: AnalyticsSessionWhereUniqueInput
  }

  /**
   * AnalyticsSession updateMany
   */
  export type AnalyticsSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalyticsSessions.
     */
    data: XOR<AnalyticsSessionUpdateManyMutationInput, AnalyticsSessionUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsSessions to update
     */
    where?: AnalyticsSessionWhereInput
    /**
     * Limit how many AnalyticsSessions to update.
     */
    limit?: number
  }

  /**
   * AnalyticsSession updateManyAndReturn
   */
  export type AnalyticsSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * The data used to update AnalyticsSessions.
     */
    data: XOR<AnalyticsSessionUpdateManyMutationInput, AnalyticsSessionUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsSessions to update
     */
    where?: AnalyticsSessionWhereInput
    /**
     * Limit how many AnalyticsSessions to update.
     */
    limit?: number
  }

  /**
   * AnalyticsSession upsert
   */
  export type AnalyticsSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AnalyticsSession to update in case it exists.
     */
    where: AnalyticsSessionWhereUniqueInput
    /**
     * In case the AnalyticsSession found by the `where` argument doesn't exist, create a new AnalyticsSession with this data.
     */
    create: XOR<AnalyticsSessionCreateInput, AnalyticsSessionUncheckedCreateInput>
    /**
     * In case the AnalyticsSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticsSessionUpdateInput, AnalyticsSessionUncheckedUpdateInput>
  }

  /**
   * AnalyticsSession delete
   */
  export type AnalyticsSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
    /**
     * Filter which AnalyticsSession to delete.
     */
    where: AnalyticsSessionWhereUniqueInput
  }

  /**
   * AnalyticsSession deleteMany
   */
  export type AnalyticsSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsSessions to delete
     */
    where?: AnalyticsSessionWhereInput
    /**
     * Limit how many AnalyticsSessions to delete.
     */
    limit?: number
  }

  /**
   * AnalyticsSession.events
   */
  export type AnalyticsSession$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    cursor?: AnalyticsEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsSession without action
   */
  export type AnalyticsSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsSession
     */
    select?: AnalyticsSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsSession
     */
    omit?: AnalyticsSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsSessionInclude<ExtArgs> | null
  }


  /**
   * Model AnalyticsEvent
   */

  export type AggregateAnalyticsEvent = {
    _count: AnalyticsEventCountAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  export type AnalyticsEventMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    type: $Enums.AnalyticsEventType | null
    path: string | null
    label: string | null
    value: string | null
    createdAt: Date | null
  }

  export type AnalyticsEventMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    type: $Enums.AnalyticsEventType | null
    path: string | null
    label: string | null
    value: string | null
    createdAt: Date | null
  }

  export type AnalyticsEventCountAggregateOutputType = {
    id: number
    sessionId: number
    type: number
    path: number
    label: number
    value: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AnalyticsEventMinAggregateInputType = {
    id?: true
    sessionId?: true
    type?: true
    path?: true
    label?: true
    value?: true
    createdAt?: true
  }

  export type AnalyticsEventMaxAggregateInputType = {
    id?: true
    sessionId?: true
    type?: true
    path?: true
    label?: true
    value?: true
    createdAt?: true
  }

  export type AnalyticsEventCountAggregateInputType = {
    id?: true
    sessionId?: true
    type?: true
    path?: true
    label?: true
    value?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AnalyticsEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvent to aggregate.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalyticsEvents
    **/
    _count?: true | AnalyticsEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticsEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type GetAnalyticsEventAggregateType<T extends AnalyticsEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalyticsEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
      : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
  }




  export type AnalyticsEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithAggregationInput | AnalyticsEventOrderByWithAggregationInput[]
    by: AnalyticsEventScalarFieldEnum[] | AnalyticsEventScalarFieldEnum
    having?: AnalyticsEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticsEventCountAggregateInputType | true
    _min?: AnalyticsEventMinAggregateInputType
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type AnalyticsEventGroupByOutputType = {
    id: string
    sessionId: string
    type: $Enums.AnalyticsEventType
    path: string | null
    label: string | null
    value: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: AnalyticsEventCountAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  type GetAnalyticsEventGroupByPayload<T extends AnalyticsEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticsEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticsEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticsEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    type?: boolean
    path?: boolean
    label?: boolean
    value?: boolean
    metadata?: boolean
    createdAt?: boolean
    session?: boolean | AnalyticsSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    type?: boolean
    path?: boolean
    label?: boolean
    value?: boolean
    metadata?: boolean
    createdAt?: boolean
    session?: boolean | AnalyticsSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    type?: boolean
    path?: boolean
    label?: boolean
    value?: boolean
    metadata?: boolean
    createdAt?: boolean
    session?: boolean | AnalyticsSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectScalar = {
    id?: boolean
    sessionId?: boolean
    type?: boolean
    path?: boolean
    label?: boolean
    value?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AnalyticsEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "type" | "path" | "label" | "value" | "metadata" | "createdAt", ExtArgs["result"]["analyticsEvent"]>
  export type AnalyticsEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AnalyticsSessionDefaultArgs<ExtArgs>
  }
  export type AnalyticsEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AnalyticsSessionDefaultArgs<ExtArgs>
  }
  export type AnalyticsEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AnalyticsSessionDefaultArgs<ExtArgs>
  }

  export type $AnalyticsEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalyticsEvent"
    objects: {
      session: Prisma.$AnalyticsSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      type: $Enums.AnalyticsEventType
      path: string | null
      label: string | null
      value: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["analyticsEvent"]>
    composites: {}
  }

  type AnalyticsEventGetPayload<S extends boolean | null | undefined | AnalyticsEventDefaultArgs> = $Result.GetResult<Prisma.$AnalyticsEventPayload, S>

  type AnalyticsEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalyticsEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalyticsEventCountAggregateInputType | true
    }

  export interface AnalyticsEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalyticsEvent'], meta: { name: 'AnalyticsEvent' } }
    /**
     * Find zero or one AnalyticsEvent that matches the filter.
     * @param {AnalyticsEventFindUniqueArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticsEventFindUniqueArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnalyticsEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalyticsEventFindUniqueOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticsEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticsEventFindFirstArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticsEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnalyticsEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany()
     * 
     * // Get first 10 AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticsEventFindManyArgs>(args?: SelectSubset<T, AnalyticsEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnalyticsEvent.
     * @param {AnalyticsEventCreateArgs} args - Arguments to create a AnalyticsEvent.
     * @example
     * // Create one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.create({
     *   data: {
     *     // ... data to create a AnalyticsEvent
     *   }
     * })
     * 
     */
    create<T extends AnalyticsEventCreateArgs>(args: SelectSubset<T, AnalyticsEventCreateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnalyticsEvents.
     * @param {AnalyticsEventCreateManyArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticsEventCreateManyArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalyticsEvents and returns the data saved in the database.
     * @param {AnalyticsEventCreateManyAndReturnArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalyticsEvents and only return the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalyticsEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnalyticsEvent.
     * @param {AnalyticsEventDeleteArgs} args - Arguments to delete one AnalyticsEvent.
     * @example
     * // Delete one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.delete({
     *   where: {
     *     // ... filter to delete one AnalyticsEvent
     *   }
     * })
     * 
     */
    delete<T extends AnalyticsEventDeleteArgs>(args: SelectSubset<T, AnalyticsEventDeleteArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnalyticsEvent.
     * @param {AnalyticsEventUpdateArgs} args - Arguments to update one AnalyticsEvent.
     * @example
     * // Update one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticsEventUpdateArgs>(args: SelectSubset<T, AnalyticsEventUpdateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnalyticsEvents.
     * @param {AnalyticsEventDeleteManyArgs} args - Arguments to filter AnalyticsEvents to delete.
     * @example
     * // Delete a few AnalyticsEvents
     * const { count } = await prisma.analyticsEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticsEventDeleteManyArgs>(args?: SelectSubset<T, AnalyticsEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticsEventUpdateManyArgs>(args: SelectSubset<T, AnalyticsEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsEvents and returns the data updated in the database.
     * @param {AnalyticsEventUpdateManyAndReturnArgs} args - Arguments to update many AnalyticsEvents.
     * @example
     * // Update many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnalyticsEvents and only return the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalyticsEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalyticsEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnalyticsEvent.
     * @param {AnalyticsEventUpsertArgs} args - Arguments to update or create a AnalyticsEvent.
     * @example
     * // Update or create a AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.upsert({
     *   create: {
     *     // ... data to create a AnalyticsEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalyticsEvent we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticsEventUpsertArgs>(args: SelectSubset<T, AnalyticsEventUpsertArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventCountArgs} args - Arguments to filter AnalyticsEvents to count.
     * @example
     * // Count the number of AnalyticsEvents
     * const count = await prisma.analyticsEvent.count({
     *   where: {
     *     // ... the filter for the AnalyticsEvents we want to count
     *   }
     * })
    **/
    count<T extends AnalyticsEventCountArgs>(
      args?: Subset<T, AnalyticsEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticsEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalyticsEventAggregateArgs>(args: Subset<T, AnalyticsEventAggregateArgs>): Prisma.PrismaPromise<GetAnalyticsEventAggregateType<T>>

    /**
     * Group by AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalyticsEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticsEventGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticsEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalyticsEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticsEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalyticsEvent model
   */
  readonly fields: AnalyticsEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalyticsEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticsEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends AnalyticsSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnalyticsSessionDefaultArgs<ExtArgs>>): Prisma__AnalyticsSessionClient<$Result.GetResult<Prisma.$AnalyticsSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnalyticsEvent model
   */
  interface AnalyticsEventFieldRefs {
    readonly id: FieldRef<"AnalyticsEvent", 'String'>
    readonly sessionId: FieldRef<"AnalyticsEvent", 'String'>
    readonly type: FieldRef<"AnalyticsEvent", 'AnalyticsEventType'>
    readonly path: FieldRef<"AnalyticsEvent", 'String'>
    readonly label: FieldRef<"AnalyticsEvent", 'String'>
    readonly value: FieldRef<"AnalyticsEvent", 'String'>
    readonly metadata: FieldRef<"AnalyticsEvent", 'Json'>
    readonly createdAt: FieldRef<"AnalyticsEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalyticsEvent findUnique
   */
  export type AnalyticsEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findUniqueOrThrow
   */
  export type AnalyticsEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findFirst
   */
  export type AnalyticsEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findFirstOrThrow
   */
  export type AnalyticsEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findMany
   */
  export type AnalyticsEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvents to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent create
   */
  export type AnalyticsEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
  }

  /**
   * AnalyticsEvent createMany
   */
  export type AnalyticsEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticsEvent createManyAndReturn
   */
  export type AnalyticsEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticsEvent update
   */
  export type AnalyticsEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
    /**
     * Choose, which AnalyticsEvent to update.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent updateMany
   */
  export type AnalyticsEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalyticsEvents.
     */
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsEvents to update
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to update.
     */
    limit?: number
  }

  /**
   * AnalyticsEvent updateManyAndReturn
   */
  export type AnalyticsEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * The data used to update AnalyticsEvents.
     */
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsEvents to update
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticsEvent upsert
   */
  export type AnalyticsEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AnalyticsEvent to update in case it exists.
     */
    where: AnalyticsEventWhereUniqueInput
    /**
     * In case the AnalyticsEvent found by the `where` argument doesn't exist, create a new AnalyticsEvent with this data.
     */
    create: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
    /**
     * In case the AnalyticsEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
  }

  /**
   * AnalyticsEvent delete
   */
  export type AnalyticsEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter which AnalyticsEvent to delete.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent deleteMany
   */
  export type AnalyticsEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvents to delete
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to delete.
     */
    limit?: number
  }

  /**
   * AnalyticsEvent without action
   */
  export type AnalyticsEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
  }


  /**
   * Model PortfolioProject
   */

  export type AggregatePortfolioProject = {
    _count: PortfolioProjectCountAggregateOutputType | null
    _avg: PortfolioProjectAvgAggregateOutputType | null
    _sum: PortfolioProjectSumAggregateOutputType | null
    _min: PortfolioProjectMinAggregateOutputType | null
    _max: PortfolioProjectMaxAggregateOutputType | null
  }

  export type PortfolioProjectAvgAggregateOutputType = {
    order: number | null
  }

  export type PortfolioProjectSumAggregateOutputType = {
    order: number | null
  }

  export type PortfolioProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    category: string | null
    description: string | null
    image: string | null
    url: string | null
    featured: boolean | null
    order: number | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    category: string | null
    description: string | null
    image: string | null
    url: string | null
    featured: boolean | null
    order: number | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortfolioProjectCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    category: number
    description: number
    image: number
    url: number
    featured: number
    order: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortfolioProjectAvgAggregateInputType = {
    order?: true
  }

  export type PortfolioProjectSumAggregateInputType = {
    order?: true
  }

  export type PortfolioProjectMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    category?: true
    description?: true
    image?: true
    url?: true
    featured?: true
    order?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioProjectMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    category?: true
    description?: true
    image?: true
    url?: true
    featured?: true
    order?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortfolioProjectCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    category?: true
    description?: true
    image?: true
    url?: true
    featured?: true
    order?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortfolioProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioProject to aggregate.
     */
    where?: PortfolioProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioProjects to fetch.
     */
    orderBy?: PortfolioProjectOrderByWithRelationInput | PortfolioProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortfolioProjects
    **/
    _count?: true | PortfolioProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortfolioProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortfolioProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioProjectMaxAggregateInputType
  }

  export type GetPortfolioProjectAggregateType<T extends PortfolioProjectAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolioProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolioProject[P]>
      : GetScalarType<T[P], AggregatePortfolioProject[P]>
  }




  export type PortfolioProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioProjectWhereInput
    orderBy?: PortfolioProjectOrderByWithAggregationInput | PortfolioProjectOrderByWithAggregationInput[]
    by: PortfolioProjectScalarFieldEnum[] | PortfolioProjectScalarFieldEnum
    having?: PortfolioProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioProjectCountAggregateInputType | true
    _avg?: PortfolioProjectAvgAggregateInputType
    _sum?: PortfolioProjectSumAggregateInputType
    _min?: PortfolioProjectMinAggregateInputType
    _max?: PortfolioProjectMaxAggregateInputType
  }

  export type PortfolioProjectGroupByOutputType = {
    id: string
    title: string
    slug: string
    category: string | null
    description: string
    image: string | null
    url: string | null
    featured: boolean
    order: number
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: PortfolioProjectCountAggregateOutputType | null
    _avg: PortfolioProjectAvgAggregateOutputType | null
    _sum: PortfolioProjectSumAggregateOutputType | null
    _min: PortfolioProjectMinAggregateOutputType | null
    _max: PortfolioProjectMaxAggregateOutputType | null
  }

  type GetPortfolioProjectGroupByPayload<T extends PortfolioProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioProjectGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioProjectGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    category?: boolean
    description?: boolean
    image?: boolean
    url?: boolean
    featured?: boolean
    order?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["portfolioProject"]>

  export type PortfolioProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    category?: boolean
    description?: boolean
    image?: boolean
    url?: boolean
    featured?: boolean
    order?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["portfolioProject"]>

  export type PortfolioProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    category?: boolean
    description?: boolean
    image?: boolean
    url?: boolean
    featured?: boolean
    order?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["portfolioProject"]>

  export type PortfolioProjectSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    category?: boolean
    description?: boolean
    image?: boolean
    url?: boolean
    featured?: boolean
    order?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortfolioProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "category" | "description" | "image" | "url" | "featured" | "order" | "published" | "createdAt" | "updatedAt", ExtArgs["result"]["portfolioProject"]>

  export type $PortfolioProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortfolioProject"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      category: string | null
      description: string
      image: string | null
      url: string | null
      featured: boolean
      order: number
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portfolioProject"]>
    composites: {}
  }

  type PortfolioProjectGetPayload<S extends boolean | null | undefined | PortfolioProjectDefaultArgs> = $Result.GetResult<Prisma.$PortfolioProjectPayload, S>

  type PortfolioProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortfolioProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortfolioProjectCountAggregateInputType | true
    }

  export interface PortfolioProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortfolioProject'], meta: { name: 'PortfolioProject' } }
    /**
     * Find zero or one PortfolioProject that matches the filter.
     * @param {PortfolioProjectFindUniqueArgs} args - Arguments to find a PortfolioProject
     * @example
     * // Get one PortfolioProject
     * const portfolioProject = await prisma.portfolioProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioProjectFindUniqueArgs>(args: SelectSubset<T, PortfolioProjectFindUniqueArgs<ExtArgs>>): Prisma__PortfolioProjectClient<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PortfolioProject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioProjectFindUniqueOrThrowArgs} args - Arguments to find a PortfolioProject
     * @example
     * // Get one PortfolioProject
     * const portfolioProject = await prisma.portfolioProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioProjectClient<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortfolioProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioProjectFindFirstArgs} args - Arguments to find a PortfolioProject
     * @example
     * // Get one PortfolioProject
     * const portfolioProject = await prisma.portfolioProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioProjectFindFirstArgs>(args?: SelectSubset<T, PortfolioProjectFindFirstArgs<ExtArgs>>): Prisma__PortfolioProjectClient<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortfolioProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioProjectFindFirstOrThrowArgs} args - Arguments to find a PortfolioProject
     * @example
     * // Get one PortfolioProject
     * const portfolioProject = await prisma.portfolioProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioProjectClient<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PortfolioProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortfolioProjects
     * const portfolioProjects = await prisma.portfolioProject.findMany()
     * 
     * // Get first 10 PortfolioProjects
     * const portfolioProjects = await prisma.portfolioProject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioProjectWithIdOnly = await prisma.portfolioProject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioProjectFindManyArgs>(args?: SelectSubset<T, PortfolioProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PortfolioProject.
     * @param {PortfolioProjectCreateArgs} args - Arguments to create a PortfolioProject.
     * @example
     * // Create one PortfolioProject
     * const PortfolioProject = await prisma.portfolioProject.create({
     *   data: {
     *     // ... data to create a PortfolioProject
     *   }
     * })
     * 
     */
    create<T extends PortfolioProjectCreateArgs>(args: SelectSubset<T, PortfolioProjectCreateArgs<ExtArgs>>): Prisma__PortfolioProjectClient<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PortfolioProjects.
     * @param {PortfolioProjectCreateManyArgs} args - Arguments to create many PortfolioProjects.
     * @example
     * // Create many PortfolioProjects
     * const portfolioProject = await prisma.portfolioProject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioProjectCreateManyArgs>(args?: SelectSubset<T, PortfolioProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PortfolioProjects and returns the data saved in the database.
     * @param {PortfolioProjectCreateManyAndReturnArgs} args - Arguments to create many PortfolioProjects.
     * @example
     * // Create many PortfolioProjects
     * const portfolioProject = await prisma.portfolioProject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PortfolioProjects and only return the `id`
     * const portfolioProjectWithIdOnly = await prisma.portfolioProject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortfolioProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, PortfolioProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PortfolioProject.
     * @param {PortfolioProjectDeleteArgs} args - Arguments to delete one PortfolioProject.
     * @example
     * // Delete one PortfolioProject
     * const PortfolioProject = await prisma.portfolioProject.delete({
     *   where: {
     *     // ... filter to delete one PortfolioProject
     *   }
     * })
     * 
     */
    delete<T extends PortfolioProjectDeleteArgs>(args: SelectSubset<T, PortfolioProjectDeleteArgs<ExtArgs>>): Prisma__PortfolioProjectClient<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PortfolioProject.
     * @param {PortfolioProjectUpdateArgs} args - Arguments to update one PortfolioProject.
     * @example
     * // Update one PortfolioProject
     * const portfolioProject = await prisma.portfolioProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioProjectUpdateArgs>(args: SelectSubset<T, PortfolioProjectUpdateArgs<ExtArgs>>): Prisma__PortfolioProjectClient<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PortfolioProjects.
     * @param {PortfolioProjectDeleteManyArgs} args - Arguments to filter PortfolioProjects to delete.
     * @example
     * // Delete a few PortfolioProjects
     * const { count } = await prisma.portfolioProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioProjectDeleteManyArgs>(args?: SelectSubset<T, PortfolioProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortfolioProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortfolioProjects
     * const portfolioProject = await prisma.portfolioProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioProjectUpdateManyArgs>(args: SelectSubset<T, PortfolioProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortfolioProjects and returns the data updated in the database.
     * @param {PortfolioProjectUpdateManyAndReturnArgs} args - Arguments to update many PortfolioProjects.
     * @example
     * // Update many PortfolioProjects
     * const portfolioProject = await prisma.portfolioProject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PortfolioProjects and only return the `id`
     * const portfolioProjectWithIdOnly = await prisma.portfolioProject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PortfolioProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, PortfolioProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PortfolioProject.
     * @param {PortfolioProjectUpsertArgs} args - Arguments to update or create a PortfolioProject.
     * @example
     * // Update or create a PortfolioProject
     * const portfolioProject = await prisma.portfolioProject.upsert({
     *   create: {
     *     // ... data to create a PortfolioProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortfolioProject we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioProjectUpsertArgs>(args: SelectSubset<T, PortfolioProjectUpsertArgs<ExtArgs>>): Prisma__PortfolioProjectClient<$Result.GetResult<Prisma.$PortfolioProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PortfolioProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioProjectCountArgs} args - Arguments to filter PortfolioProjects to count.
     * @example
     * // Count the number of PortfolioProjects
     * const count = await prisma.portfolioProject.count({
     *   where: {
     *     // ... the filter for the PortfolioProjects we want to count
     *   }
     * })
    **/
    count<T extends PortfolioProjectCountArgs>(
      args?: Subset<T, PortfolioProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortfolioProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioProjectAggregateArgs>(args: Subset<T, PortfolioProjectAggregateArgs>): Prisma.PrismaPromise<GetPortfolioProjectAggregateType<T>>

    /**
     * Group by PortfolioProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioProjectGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortfolioProject model
   */
  readonly fields: PortfolioProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortfolioProject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PortfolioProject model
   */
  interface PortfolioProjectFieldRefs {
    readonly id: FieldRef<"PortfolioProject", 'String'>
    readonly title: FieldRef<"PortfolioProject", 'String'>
    readonly slug: FieldRef<"PortfolioProject", 'String'>
    readonly category: FieldRef<"PortfolioProject", 'String'>
    readonly description: FieldRef<"PortfolioProject", 'String'>
    readonly image: FieldRef<"PortfolioProject", 'String'>
    readonly url: FieldRef<"PortfolioProject", 'String'>
    readonly featured: FieldRef<"PortfolioProject", 'Boolean'>
    readonly order: FieldRef<"PortfolioProject", 'Int'>
    readonly published: FieldRef<"PortfolioProject", 'Boolean'>
    readonly createdAt: FieldRef<"PortfolioProject", 'DateTime'>
    readonly updatedAt: FieldRef<"PortfolioProject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PortfolioProject findUnique
   */
  export type PortfolioProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * Filter, which PortfolioProject to fetch.
     */
    where: PortfolioProjectWhereUniqueInput
  }

  /**
   * PortfolioProject findUniqueOrThrow
   */
  export type PortfolioProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * Filter, which PortfolioProject to fetch.
     */
    where: PortfolioProjectWhereUniqueInput
  }

  /**
   * PortfolioProject findFirst
   */
  export type PortfolioProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * Filter, which PortfolioProject to fetch.
     */
    where?: PortfolioProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioProjects to fetch.
     */
    orderBy?: PortfolioProjectOrderByWithRelationInput | PortfolioProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioProjects.
     */
    cursor?: PortfolioProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioProjects.
     */
    distinct?: PortfolioProjectScalarFieldEnum | PortfolioProjectScalarFieldEnum[]
  }

  /**
   * PortfolioProject findFirstOrThrow
   */
  export type PortfolioProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * Filter, which PortfolioProject to fetch.
     */
    where?: PortfolioProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioProjects to fetch.
     */
    orderBy?: PortfolioProjectOrderByWithRelationInput | PortfolioProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioProjects.
     */
    cursor?: PortfolioProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioProjects.
     */
    distinct?: PortfolioProjectScalarFieldEnum | PortfolioProjectScalarFieldEnum[]
  }

  /**
   * PortfolioProject findMany
   */
  export type PortfolioProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * Filter, which PortfolioProjects to fetch.
     */
    where?: PortfolioProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioProjects to fetch.
     */
    orderBy?: PortfolioProjectOrderByWithRelationInput | PortfolioProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortfolioProjects.
     */
    cursor?: PortfolioProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioProjects.
     */
    skip?: number
    distinct?: PortfolioProjectScalarFieldEnum | PortfolioProjectScalarFieldEnum[]
  }

  /**
   * PortfolioProject create
   */
  export type PortfolioProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * The data needed to create a PortfolioProject.
     */
    data: XOR<PortfolioProjectCreateInput, PortfolioProjectUncheckedCreateInput>
  }

  /**
   * PortfolioProject createMany
   */
  export type PortfolioProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortfolioProjects.
     */
    data: PortfolioProjectCreateManyInput | PortfolioProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortfolioProject createManyAndReturn
   */
  export type PortfolioProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * The data used to create many PortfolioProjects.
     */
    data: PortfolioProjectCreateManyInput | PortfolioProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortfolioProject update
   */
  export type PortfolioProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * The data needed to update a PortfolioProject.
     */
    data: XOR<PortfolioProjectUpdateInput, PortfolioProjectUncheckedUpdateInput>
    /**
     * Choose, which PortfolioProject to update.
     */
    where: PortfolioProjectWhereUniqueInput
  }

  /**
   * PortfolioProject updateMany
   */
  export type PortfolioProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortfolioProjects.
     */
    data: XOR<PortfolioProjectUpdateManyMutationInput, PortfolioProjectUncheckedUpdateManyInput>
    /**
     * Filter which PortfolioProjects to update
     */
    where?: PortfolioProjectWhereInput
    /**
     * Limit how many PortfolioProjects to update.
     */
    limit?: number
  }

  /**
   * PortfolioProject updateManyAndReturn
   */
  export type PortfolioProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * The data used to update PortfolioProjects.
     */
    data: XOR<PortfolioProjectUpdateManyMutationInput, PortfolioProjectUncheckedUpdateManyInput>
    /**
     * Filter which PortfolioProjects to update
     */
    where?: PortfolioProjectWhereInput
    /**
     * Limit how many PortfolioProjects to update.
     */
    limit?: number
  }

  /**
   * PortfolioProject upsert
   */
  export type PortfolioProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * The filter to search for the PortfolioProject to update in case it exists.
     */
    where: PortfolioProjectWhereUniqueInput
    /**
     * In case the PortfolioProject found by the `where` argument doesn't exist, create a new PortfolioProject with this data.
     */
    create: XOR<PortfolioProjectCreateInput, PortfolioProjectUncheckedCreateInput>
    /**
     * In case the PortfolioProject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioProjectUpdateInput, PortfolioProjectUncheckedUpdateInput>
  }

  /**
   * PortfolioProject delete
   */
  export type PortfolioProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
    /**
     * Filter which PortfolioProject to delete.
     */
    where: PortfolioProjectWhereUniqueInput
  }

  /**
   * PortfolioProject deleteMany
   */
  export type PortfolioProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioProjects to delete
     */
    where?: PortfolioProjectWhereInput
    /**
     * Limit how many PortfolioProjects to delete.
     */
    limit?: number
  }

  /**
   * PortfolioProject without action
   */
  export type PortfolioProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioProject
     */
    select?: PortfolioProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioProject
     */
    omit?: PortfolioProjectOmit<ExtArgs> | null
  }


  /**
   * Model SiteText
   */

  export type AggregateSiteText = {
    _count: SiteTextCountAggregateOutputType | null
    _min: SiteTextMinAggregateOutputType | null
    _max: SiteTextMaxAggregateOutputType | null
  }

  export type SiteTextMinAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    group: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiteTextMaxAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    group: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiteTextCountAggregateOutputType = {
    id: number
    key: number
    value: number
    group: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SiteTextMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    group?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiteTextMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    group?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiteTextCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    group?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteTextAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteText to aggregate.
     */
    where?: SiteTextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteTexts to fetch.
     */
    orderBy?: SiteTextOrderByWithRelationInput | SiteTextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteTextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteTexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteTexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteTexts
    **/
    _count?: true | SiteTextCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteTextMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteTextMaxAggregateInputType
  }

  export type GetSiteTextAggregateType<T extends SiteTextAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteText]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteText[P]>
      : GetScalarType<T[P], AggregateSiteText[P]>
  }




  export type SiteTextGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteTextWhereInput
    orderBy?: SiteTextOrderByWithAggregationInput | SiteTextOrderByWithAggregationInput[]
    by: SiteTextScalarFieldEnum[] | SiteTextScalarFieldEnum
    having?: SiteTextScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteTextCountAggregateInputType | true
    _min?: SiteTextMinAggregateInputType
    _max?: SiteTextMaxAggregateInputType
  }

  export type SiteTextGroupByOutputType = {
    id: string
    key: string
    value: string
    group: string | null
    createdAt: Date
    updatedAt: Date
    _count: SiteTextCountAggregateOutputType | null
    _min: SiteTextMinAggregateOutputType | null
    _max: SiteTextMaxAggregateOutputType | null
  }

  type GetSiteTextGroupByPayload<T extends SiteTextGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteTextGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteTextGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteTextGroupByOutputType[P]>
            : GetScalarType<T[P], SiteTextGroupByOutputType[P]>
        }
      >
    >


  export type SiteTextSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    group?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteText"]>

  export type SiteTextSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    group?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteText"]>

  export type SiteTextSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    group?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteText"]>

  export type SiteTextSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    group?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SiteTextOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "group" | "createdAt" | "updatedAt", ExtArgs["result"]["siteText"]>

  export type $SiteTextPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteText"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: string
      group: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["siteText"]>
    composites: {}
  }

  type SiteTextGetPayload<S extends boolean | null | undefined | SiteTextDefaultArgs> = $Result.GetResult<Prisma.$SiteTextPayload, S>

  type SiteTextCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteTextFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteTextCountAggregateInputType | true
    }

  export interface SiteTextDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteText'], meta: { name: 'SiteText' } }
    /**
     * Find zero or one SiteText that matches the filter.
     * @param {SiteTextFindUniqueArgs} args - Arguments to find a SiteText
     * @example
     * // Get one SiteText
     * const siteText = await prisma.siteText.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteTextFindUniqueArgs>(args: SelectSubset<T, SiteTextFindUniqueArgs<ExtArgs>>): Prisma__SiteTextClient<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SiteText that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteTextFindUniqueOrThrowArgs} args - Arguments to find a SiteText
     * @example
     * // Get one SiteText
     * const siteText = await prisma.siteText.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteTextFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteTextFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteTextClient<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteText that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteTextFindFirstArgs} args - Arguments to find a SiteText
     * @example
     * // Get one SiteText
     * const siteText = await prisma.siteText.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteTextFindFirstArgs>(args?: SelectSubset<T, SiteTextFindFirstArgs<ExtArgs>>): Prisma__SiteTextClient<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteText that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteTextFindFirstOrThrowArgs} args - Arguments to find a SiteText
     * @example
     * // Get one SiteText
     * const siteText = await prisma.siteText.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteTextFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteTextFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteTextClient<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SiteTexts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteTextFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteTexts
     * const siteTexts = await prisma.siteText.findMany()
     * 
     * // Get first 10 SiteTexts
     * const siteTexts = await prisma.siteText.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteTextWithIdOnly = await prisma.siteText.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteTextFindManyArgs>(args?: SelectSubset<T, SiteTextFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SiteText.
     * @param {SiteTextCreateArgs} args - Arguments to create a SiteText.
     * @example
     * // Create one SiteText
     * const SiteText = await prisma.siteText.create({
     *   data: {
     *     // ... data to create a SiteText
     *   }
     * })
     * 
     */
    create<T extends SiteTextCreateArgs>(args: SelectSubset<T, SiteTextCreateArgs<ExtArgs>>): Prisma__SiteTextClient<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SiteTexts.
     * @param {SiteTextCreateManyArgs} args - Arguments to create many SiteTexts.
     * @example
     * // Create many SiteTexts
     * const siteText = await prisma.siteText.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteTextCreateManyArgs>(args?: SelectSubset<T, SiteTextCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteTexts and returns the data saved in the database.
     * @param {SiteTextCreateManyAndReturnArgs} args - Arguments to create many SiteTexts.
     * @example
     * // Create many SiteTexts
     * const siteText = await prisma.siteText.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteTexts and only return the `id`
     * const siteTextWithIdOnly = await prisma.siteText.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteTextCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteTextCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SiteText.
     * @param {SiteTextDeleteArgs} args - Arguments to delete one SiteText.
     * @example
     * // Delete one SiteText
     * const SiteText = await prisma.siteText.delete({
     *   where: {
     *     // ... filter to delete one SiteText
     *   }
     * })
     * 
     */
    delete<T extends SiteTextDeleteArgs>(args: SelectSubset<T, SiteTextDeleteArgs<ExtArgs>>): Prisma__SiteTextClient<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SiteText.
     * @param {SiteTextUpdateArgs} args - Arguments to update one SiteText.
     * @example
     * // Update one SiteText
     * const siteText = await prisma.siteText.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteTextUpdateArgs>(args: SelectSubset<T, SiteTextUpdateArgs<ExtArgs>>): Prisma__SiteTextClient<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SiteTexts.
     * @param {SiteTextDeleteManyArgs} args - Arguments to filter SiteTexts to delete.
     * @example
     * // Delete a few SiteTexts
     * const { count } = await prisma.siteText.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteTextDeleteManyArgs>(args?: SelectSubset<T, SiteTextDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteTexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteTextUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteTexts
     * const siteText = await prisma.siteText.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteTextUpdateManyArgs>(args: SelectSubset<T, SiteTextUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteTexts and returns the data updated in the database.
     * @param {SiteTextUpdateManyAndReturnArgs} args - Arguments to update many SiteTexts.
     * @example
     * // Update many SiteTexts
     * const siteText = await prisma.siteText.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SiteTexts and only return the `id`
     * const siteTextWithIdOnly = await prisma.siteText.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiteTextUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteTextUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SiteText.
     * @param {SiteTextUpsertArgs} args - Arguments to update or create a SiteText.
     * @example
     * // Update or create a SiteText
     * const siteText = await prisma.siteText.upsert({
     *   create: {
     *     // ... data to create a SiteText
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteText we want to update
     *   }
     * })
     */
    upsert<T extends SiteTextUpsertArgs>(args: SelectSubset<T, SiteTextUpsertArgs<ExtArgs>>): Prisma__SiteTextClient<$Result.GetResult<Prisma.$SiteTextPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SiteTexts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteTextCountArgs} args - Arguments to filter SiteTexts to count.
     * @example
     * // Count the number of SiteTexts
     * const count = await prisma.siteText.count({
     *   where: {
     *     // ... the filter for the SiteTexts we want to count
     *   }
     * })
    **/
    count<T extends SiteTextCountArgs>(
      args?: Subset<T, SiteTextCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteTextCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteText.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteTextAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteTextAggregateArgs>(args: Subset<T, SiteTextAggregateArgs>): Prisma.PrismaPromise<GetSiteTextAggregateType<T>>

    /**
     * Group by SiteText.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteTextGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteTextGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteTextGroupByArgs['orderBy'] }
        : { orderBy?: SiteTextGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteTextGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteTextGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteText model
   */
  readonly fields: SiteTextFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteText.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteTextClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SiteText model
   */
  interface SiteTextFieldRefs {
    readonly id: FieldRef<"SiteText", 'String'>
    readonly key: FieldRef<"SiteText", 'String'>
    readonly value: FieldRef<"SiteText", 'String'>
    readonly group: FieldRef<"SiteText", 'String'>
    readonly createdAt: FieldRef<"SiteText", 'DateTime'>
    readonly updatedAt: FieldRef<"SiteText", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SiteText findUnique
   */
  export type SiteTextFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * Filter, which SiteText to fetch.
     */
    where: SiteTextWhereUniqueInput
  }

  /**
   * SiteText findUniqueOrThrow
   */
  export type SiteTextFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * Filter, which SiteText to fetch.
     */
    where: SiteTextWhereUniqueInput
  }

  /**
   * SiteText findFirst
   */
  export type SiteTextFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * Filter, which SiteText to fetch.
     */
    where?: SiteTextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteTexts to fetch.
     */
    orderBy?: SiteTextOrderByWithRelationInput | SiteTextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteTexts.
     */
    cursor?: SiteTextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteTexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteTexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteTexts.
     */
    distinct?: SiteTextScalarFieldEnum | SiteTextScalarFieldEnum[]
  }

  /**
   * SiteText findFirstOrThrow
   */
  export type SiteTextFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * Filter, which SiteText to fetch.
     */
    where?: SiteTextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteTexts to fetch.
     */
    orderBy?: SiteTextOrderByWithRelationInput | SiteTextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteTexts.
     */
    cursor?: SiteTextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteTexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteTexts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteTexts.
     */
    distinct?: SiteTextScalarFieldEnum | SiteTextScalarFieldEnum[]
  }

  /**
   * SiteText findMany
   */
  export type SiteTextFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * Filter, which SiteTexts to fetch.
     */
    where?: SiteTextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteTexts to fetch.
     */
    orderBy?: SiteTextOrderByWithRelationInput | SiteTextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteTexts.
     */
    cursor?: SiteTextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteTexts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteTexts.
     */
    skip?: number
    distinct?: SiteTextScalarFieldEnum | SiteTextScalarFieldEnum[]
  }

  /**
   * SiteText create
   */
  export type SiteTextCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * The data needed to create a SiteText.
     */
    data: XOR<SiteTextCreateInput, SiteTextUncheckedCreateInput>
  }

  /**
   * SiteText createMany
   */
  export type SiteTextCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteTexts.
     */
    data: SiteTextCreateManyInput | SiteTextCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteText createManyAndReturn
   */
  export type SiteTextCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * The data used to create many SiteTexts.
     */
    data: SiteTextCreateManyInput | SiteTextCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteText update
   */
  export type SiteTextUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * The data needed to update a SiteText.
     */
    data: XOR<SiteTextUpdateInput, SiteTextUncheckedUpdateInput>
    /**
     * Choose, which SiteText to update.
     */
    where: SiteTextWhereUniqueInput
  }

  /**
   * SiteText updateMany
   */
  export type SiteTextUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteTexts.
     */
    data: XOR<SiteTextUpdateManyMutationInput, SiteTextUncheckedUpdateManyInput>
    /**
     * Filter which SiteTexts to update
     */
    where?: SiteTextWhereInput
    /**
     * Limit how many SiteTexts to update.
     */
    limit?: number
  }

  /**
   * SiteText updateManyAndReturn
   */
  export type SiteTextUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * The data used to update SiteTexts.
     */
    data: XOR<SiteTextUpdateManyMutationInput, SiteTextUncheckedUpdateManyInput>
    /**
     * Filter which SiteTexts to update
     */
    where?: SiteTextWhereInput
    /**
     * Limit how many SiteTexts to update.
     */
    limit?: number
  }

  /**
   * SiteText upsert
   */
  export type SiteTextUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * The filter to search for the SiteText to update in case it exists.
     */
    where: SiteTextWhereUniqueInput
    /**
     * In case the SiteText found by the `where` argument doesn't exist, create a new SiteText with this data.
     */
    create: XOR<SiteTextCreateInput, SiteTextUncheckedCreateInput>
    /**
     * In case the SiteText was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteTextUpdateInput, SiteTextUncheckedUpdateInput>
  }

  /**
   * SiteText delete
   */
  export type SiteTextDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
    /**
     * Filter which SiteText to delete.
     */
    where: SiteTextWhereUniqueInput
  }

  /**
   * SiteText deleteMany
   */
  export type SiteTextDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteTexts to delete
     */
    where?: SiteTextWhereInput
    /**
     * Limit how many SiteTexts to delete.
     */
    limit?: number
  }

  /**
   * SiteText without action
   */
  export type SiteTextDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteText
     */
    select?: SiteTextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteText
     */
    omit?: SiteTextOmit<ExtArgs> | null
  }


  /**
   * Model CompanySetting
   */

  export type AggregateCompanySetting = {
    _count: CompanySettingCountAggregateOutputType | null
    _min: CompanySettingMinAggregateOutputType | null
    _max: CompanySettingMaxAggregateOutputType | null
  }

  export type CompanySettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanySettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanySettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanySettingMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanySettingMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanySettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanySettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanySetting to aggregate.
     */
    where?: CompanySettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySettings to fetch.
     */
    orderBy?: CompanySettingOrderByWithRelationInput | CompanySettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanySettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanySettings
    **/
    _count?: true | CompanySettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanySettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanySettingMaxAggregateInputType
  }

  export type GetCompanySettingAggregateType<T extends CompanySettingAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanySetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanySetting[P]>
      : GetScalarType<T[P], AggregateCompanySetting[P]>
  }




  export type CompanySettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanySettingWhereInput
    orderBy?: CompanySettingOrderByWithAggregationInput | CompanySettingOrderByWithAggregationInput[]
    by: CompanySettingScalarFieldEnum[] | CompanySettingScalarFieldEnum
    having?: CompanySettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanySettingCountAggregateInputType | true
    _min?: CompanySettingMinAggregateInputType
    _max?: CompanySettingMaxAggregateInputType
  }

  export type CompanySettingGroupByOutputType = {
    id: string
    key: string
    value: string
    createdAt: Date
    updatedAt: Date
    _count: CompanySettingCountAggregateOutputType | null
    _min: CompanySettingMinAggregateOutputType | null
    _max: CompanySettingMaxAggregateOutputType | null
  }

  type GetCompanySettingGroupByPayload<T extends CompanySettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanySettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanySettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanySettingGroupByOutputType[P]>
            : GetScalarType<T[P], CompanySettingGroupByOutputType[P]>
        }
      >
    >


  export type CompanySettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["companySetting"]>

  export type CompanySettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["companySetting"]>

  export type CompanySettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["companySetting"]>

  export type CompanySettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanySettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "createdAt" | "updatedAt", ExtArgs["result"]["companySetting"]>

  export type $CompanySettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanySetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["companySetting"]>
    composites: {}
  }

  type CompanySettingGetPayload<S extends boolean | null | undefined | CompanySettingDefaultArgs> = $Result.GetResult<Prisma.$CompanySettingPayload, S>

  type CompanySettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanySettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanySettingCountAggregateInputType | true
    }

  export interface CompanySettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanySetting'], meta: { name: 'CompanySetting' } }
    /**
     * Find zero or one CompanySetting that matches the filter.
     * @param {CompanySettingFindUniqueArgs} args - Arguments to find a CompanySetting
     * @example
     * // Get one CompanySetting
     * const companySetting = await prisma.companySetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanySettingFindUniqueArgs>(args: SelectSubset<T, CompanySettingFindUniqueArgs<ExtArgs>>): Prisma__CompanySettingClient<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanySetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanySettingFindUniqueOrThrowArgs} args - Arguments to find a CompanySetting
     * @example
     * // Get one CompanySetting
     * const companySetting = await prisma.companySetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanySettingFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanySettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanySettingClient<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanySetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingFindFirstArgs} args - Arguments to find a CompanySetting
     * @example
     * // Get one CompanySetting
     * const companySetting = await prisma.companySetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanySettingFindFirstArgs>(args?: SelectSubset<T, CompanySettingFindFirstArgs<ExtArgs>>): Prisma__CompanySettingClient<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanySetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingFindFirstOrThrowArgs} args - Arguments to find a CompanySetting
     * @example
     * // Get one CompanySetting
     * const companySetting = await prisma.companySetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanySettingFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanySettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanySettingClient<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanySettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanySettings
     * const companySettings = await prisma.companySetting.findMany()
     * 
     * // Get first 10 CompanySettings
     * const companySettings = await prisma.companySetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companySettingWithIdOnly = await prisma.companySetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanySettingFindManyArgs>(args?: SelectSubset<T, CompanySettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanySetting.
     * @param {CompanySettingCreateArgs} args - Arguments to create a CompanySetting.
     * @example
     * // Create one CompanySetting
     * const CompanySetting = await prisma.companySetting.create({
     *   data: {
     *     // ... data to create a CompanySetting
     *   }
     * })
     * 
     */
    create<T extends CompanySettingCreateArgs>(args: SelectSubset<T, CompanySettingCreateArgs<ExtArgs>>): Prisma__CompanySettingClient<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanySettings.
     * @param {CompanySettingCreateManyArgs} args - Arguments to create many CompanySettings.
     * @example
     * // Create many CompanySettings
     * const companySetting = await prisma.companySetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanySettingCreateManyArgs>(args?: SelectSubset<T, CompanySettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanySettings and returns the data saved in the database.
     * @param {CompanySettingCreateManyAndReturnArgs} args - Arguments to create many CompanySettings.
     * @example
     * // Create many CompanySettings
     * const companySetting = await prisma.companySetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanySettings and only return the `id`
     * const companySettingWithIdOnly = await prisma.companySetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanySettingCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanySettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanySetting.
     * @param {CompanySettingDeleteArgs} args - Arguments to delete one CompanySetting.
     * @example
     * // Delete one CompanySetting
     * const CompanySetting = await prisma.companySetting.delete({
     *   where: {
     *     // ... filter to delete one CompanySetting
     *   }
     * })
     * 
     */
    delete<T extends CompanySettingDeleteArgs>(args: SelectSubset<T, CompanySettingDeleteArgs<ExtArgs>>): Prisma__CompanySettingClient<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanySetting.
     * @param {CompanySettingUpdateArgs} args - Arguments to update one CompanySetting.
     * @example
     * // Update one CompanySetting
     * const companySetting = await prisma.companySetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanySettingUpdateArgs>(args: SelectSubset<T, CompanySettingUpdateArgs<ExtArgs>>): Prisma__CompanySettingClient<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanySettings.
     * @param {CompanySettingDeleteManyArgs} args - Arguments to filter CompanySettings to delete.
     * @example
     * // Delete a few CompanySettings
     * const { count } = await prisma.companySetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanySettingDeleteManyArgs>(args?: SelectSubset<T, CompanySettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanySettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanySettings
     * const companySetting = await prisma.companySetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanySettingUpdateManyArgs>(args: SelectSubset<T, CompanySettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanySettings and returns the data updated in the database.
     * @param {CompanySettingUpdateManyAndReturnArgs} args - Arguments to update many CompanySettings.
     * @example
     * // Update many CompanySettings
     * const companySetting = await prisma.companySetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanySettings and only return the `id`
     * const companySettingWithIdOnly = await prisma.companySetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanySettingUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanySettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanySetting.
     * @param {CompanySettingUpsertArgs} args - Arguments to update or create a CompanySetting.
     * @example
     * // Update or create a CompanySetting
     * const companySetting = await prisma.companySetting.upsert({
     *   create: {
     *     // ... data to create a CompanySetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanySetting we want to update
     *   }
     * })
     */
    upsert<T extends CompanySettingUpsertArgs>(args: SelectSubset<T, CompanySettingUpsertArgs<ExtArgs>>): Prisma__CompanySettingClient<$Result.GetResult<Prisma.$CompanySettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanySettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingCountArgs} args - Arguments to filter CompanySettings to count.
     * @example
     * // Count the number of CompanySettings
     * const count = await prisma.companySetting.count({
     *   where: {
     *     // ... the filter for the CompanySettings we want to count
     *   }
     * })
    **/
    count<T extends CompanySettingCountArgs>(
      args?: Subset<T, CompanySettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanySettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanySetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanySettingAggregateArgs>(args: Subset<T, CompanySettingAggregateArgs>): Prisma.PrismaPromise<GetCompanySettingAggregateType<T>>

    /**
     * Group by CompanySetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanySettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanySettingGroupByArgs['orderBy'] }
        : { orderBy?: CompanySettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanySettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanySettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanySetting model
   */
  readonly fields: CompanySettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanySetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanySettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanySetting model
   */
  interface CompanySettingFieldRefs {
    readonly id: FieldRef<"CompanySetting", 'String'>
    readonly key: FieldRef<"CompanySetting", 'String'>
    readonly value: FieldRef<"CompanySetting", 'String'>
    readonly createdAt: FieldRef<"CompanySetting", 'DateTime'>
    readonly updatedAt: FieldRef<"CompanySetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompanySetting findUnique
   */
  export type CompanySettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * Filter, which CompanySetting to fetch.
     */
    where: CompanySettingWhereUniqueInput
  }

  /**
   * CompanySetting findUniqueOrThrow
   */
  export type CompanySettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * Filter, which CompanySetting to fetch.
     */
    where: CompanySettingWhereUniqueInput
  }

  /**
   * CompanySetting findFirst
   */
  export type CompanySettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * Filter, which CompanySetting to fetch.
     */
    where?: CompanySettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySettings to fetch.
     */
    orderBy?: CompanySettingOrderByWithRelationInput | CompanySettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanySettings.
     */
    cursor?: CompanySettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanySettings.
     */
    distinct?: CompanySettingScalarFieldEnum | CompanySettingScalarFieldEnum[]
  }

  /**
   * CompanySetting findFirstOrThrow
   */
  export type CompanySettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * Filter, which CompanySetting to fetch.
     */
    where?: CompanySettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySettings to fetch.
     */
    orderBy?: CompanySettingOrderByWithRelationInput | CompanySettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanySettings.
     */
    cursor?: CompanySettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanySettings.
     */
    distinct?: CompanySettingScalarFieldEnum | CompanySettingScalarFieldEnum[]
  }

  /**
   * CompanySetting findMany
   */
  export type CompanySettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * Filter, which CompanySettings to fetch.
     */
    where?: CompanySettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySettings to fetch.
     */
    orderBy?: CompanySettingOrderByWithRelationInput | CompanySettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanySettings.
     */
    cursor?: CompanySettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySettings.
     */
    skip?: number
    distinct?: CompanySettingScalarFieldEnum | CompanySettingScalarFieldEnum[]
  }

  /**
   * CompanySetting create
   */
  export type CompanySettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * The data needed to create a CompanySetting.
     */
    data: XOR<CompanySettingCreateInput, CompanySettingUncheckedCreateInput>
  }

  /**
   * CompanySetting createMany
   */
  export type CompanySettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanySettings.
     */
    data: CompanySettingCreateManyInput | CompanySettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanySetting createManyAndReturn
   */
  export type CompanySettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * The data used to create many CompanySettings.
     */
    data: CompanySettingCreateManyInput | CompanySettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanySetting update
   */
  export type CompanySettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * The data needed to update a CompanySetting.
     */
    data: XOR<CompanySettingUpdateInput, CompanySettingUncheckedUpdateInput>
    /**
     * Choose, which CompanySetting to update.
     */
    where: CompanySettingWhereUniqueInput
  }

  /**
   * CompanySetting updateMany
   */
  export type CompanySettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanySettings.
     */
    data: XOR<CompanySettingUpdateManyMutationInput, CompanySettingUncheckedUpdateManyInput>
    /**
     * Filter which CompanySettings to update
     */
    where?: CompanySettingWhereInput
    /**
     * Limit how many CompanySettings to update.
     */
    limit?: number
  }

  /**
   * CompanySetting updateManyAndReturn
   */
  export type CompanySettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * The data used to update CompanySettings.
     */
    data: XOR<CompanySettingUpdateManyMutationInput, CompanySettingUncheckedUpdateManyInput>
    /**
     * Filter which CompanySettings to update
     */
    where?: CompanySettingWhereInput
    /**
     * Limit how many CompanySettings to update.
     */
    limit?: number
  }

  /**
   * CompanySetting upsert
   */
  export type CompanySettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * The filter to search for the CompanySetting to update in case it exists.
     */
    where: CompanySettingWhereUniqueInput
    /**
     * In case the CompanySetting found by the `where` argument doesn't exist, create a new CompanySetting with this data.
     */
    create: XOR<CompanySettingCreateInput, CompanySettingUncheckedCreateInput>
    /**
     * In case the CompanySetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanySettingUpdateInput, CompanySettingUncheckedUpdateInput>
  }

  /**
   * CompanySetting delete
   */
  export type CompanySettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
    /**
     * Filter which CompanySetting to delete.
     */
    where: CompanySettingWhereUniqueInput
  }

  /**
   * CompanySetting deleteMany
   */
  export type CompanySettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanySettings to delete
     */
    where?: CompanySettingWhereInput
    /**
     * Limit how many CompanySettings to delete.
     */
    limit?: number
  }

  /**
   * CompanySetting without action
   */
  export type CompanySettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySetting
     */
    select?: CompanySettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanySetting
     */
    omit?: CompanySettingOmit<ExtArgs> | null
  }


  /**
   * Model MediaAsset
   */

  export type AggregateMediaAsset = {
    _count: MediaAssetCountAggregateOutputType | null
    _min: MediaAssetMinAggregateOutputType | null
    _max: MediaAssetMaxAggregateOutputType | null
  }

  export type MediaAssetMinAggregateOutputType = {
    id: string | null
    url: string | null
    alt: string | null
    type: string | null
    createdAt: Date | null
  }

  export type MediaAssetMaxAggregateOutputType = {
    id: string | null
    url: string | null
    alt: string | null
    type: string | null
    createdAt: Date | null
  }

  export type MediaAssetCountAggregateOutputType = {
    id: number
    url: number
    alt: number
    type: number
    createdAt: number
    _all: number
  }


  export type MediaAssetMinAggregateInputType = {
    id?: true
    url?: true
    alt?: true
    type?: true
    createdAt?: true
  }

  export type MediaAssetMaxAggregateInputType = {
    id?: true
    url?: true
    alt?: true
    type?: true
    createdAt?: true
  }

  export type MediaAssetCountAggregateInputType = {
    id?: true
    url?: true
    alt?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type MediaAssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaAsset to aggregate.
     */
    where?: MediaAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaAssets to fetch.
     */
    orderBy?: MediaAssetOrderByWithRelationInput | MediaAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaAssets
    **/
    _count?: true | MediaAssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaAssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaAssetMaxAggregateInputType
  }

  export type GetMediaAssetAggregateType<T extends MediaAssetAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaAsset[P]>
      : GetScalarType<T[P], AggregateMediaAsset[P]>
  }




  export type MediaAssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaAssetWhereInput
    orderBy?: MediaAssetOrderByWithAggregationInput | MediaAssetOrderByWithAggregationInput[]
    by: MediaAssetScalarFieldEnum[] | MediaAssetScalarFieldEnum
    having?: MediaAssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaAssetCountAggregateInputType | true
    _min?: MediaAssetMinAggregateInputType
    _max?: MediaAssetMaxAggregateInputType
  }

  export type MediaAssetGroupByOutputType = {
    id: string
    url: string
    alt: string | null
    type: string | null
    createdAt: Date
    _count: MediaAssetCountAggregateOutputType | null
    _min: MediaAssetMinAggregateOutputType | null
    _max: MediaAssetMaxAggregateOutputType | null
  }

  type GetMediaAssetGroupByPayload<T extends MediaAssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaAssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaAssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaAssetGroupByOutputType[P]>
            : GetScalarType<T[P], MediaAssetGroupByOutputType[P]>
        }
      >
    >


  export type MediaAssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    alt?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mediaAsset"]>

  export type MediaAssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    alt?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mediaAsset"]>

  export type MediaAssetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    alt?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["mediaAsset"]>

  export type MediaAssetSelectScalar = {
    id?: boolean
    url?: boolean
    alt?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type MediaAssetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "alt" | "type" | "createdAt", ExtArgs["result"]["mediaAsset"]>

  export type $MediaAssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaAsset"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      alt: string | null
      type: string | null
      createdAt: Date
    }, ExtArgs["result"]["mediaAsset"]>
    composites: {}
  }

  type MediaAssetGetPayload<S extends boolean | null | undefined | MediaAssetDefaultArgs> = $Result.GetResult<Prisma.$MediaAssetPayload, S>

  type MediaAssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaAssetCountAggregateInputType | true
    }

  export interface MediaAssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaAsset'], meta: { name: 'MediaAsset' } }
    /**
     * Find zero or one MediaAsset that matches the filter.
     * @param {MediaAssetFindUniqueArgs} args - Arguments to find a MediaAsset
     * @example
     * // Get one MediaAsset
     * const mediaAsset = await prisma.mediaAsset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaAssetFindUniqueArgs>(args: SelectSubset<T, MediaAssetFindUniqueArgs<ExtArgs>>): Prisma__MediaAssetClient<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaAsset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaAssetFindUniqueOrThrowArgs} args - Arguments to find a MediaAsset
     * @example
     * // Get one MediaAsset
     * const mediaAsset = await prisma.mediaAsset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaAssetFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaAssetClient<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaAsset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAssetFindFirstArgs} args - Arguments to find a MediaAsset
     * @example
     * // Get one MediaAsset
     * const mediaAsset = await prisma.mediaAsset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaAssetFindFirstArgs>(args?: SelectSubset<T, MediaAssetFindFirstArgs<ExtArgs>>): Prisma__MediaAssetClient<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaAsset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAssetFindFirstOrThrowArgs} args - Arguments to find a MediaAsset
     * @example
     * // Get one MediaAsset
     * const mediaAsset = await prisma.mediaAsset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaAssetFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaAssetClient<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaAssets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaAssets
     * const mediaAssets = await prisma.mediaAsset.findMany()
     * 
     * // Get first 10 MediaAssets
     * const mediaAssets = await prisma.mediaAsset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaAssetWithIdOnly = await prisma.mediaAsset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaAssetFindManyArgs>(args?: SelectSubset<T, MediaAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaAsset.
     * @param {MediaAssetCreateArgs} args - Arguments to create a MediaAsset.
     * @example
     * // Create one MediaAsset
     * const MediaAsset = await prisma.mediaAsset.create({
     *   data: {
     *     // ... data to create a MediaAsset
     *   }
     * })
     * 
     */
    create<T extends MediaAssetCreateArgs>(args: SelectSubset<T, MediaAssetCreateArgs<ExtArgs>>): Prisma__MediaAssetClient<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaAssets.
     * @param {MediaAssetCreateManyArgs} args - Arguments to create many MediaAssets.
     * @example
     * // Create many MediaAssets
     * const mediaAsset = await prisma.mediaAsset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaAssetCreateManyArgs>(args?: SelectSubset<T, MediaAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaAssets and returns the data saved in the database.
     * @param {MediaAssetCreateManyAndReturnArgs} args - Arguments to create many MediaAssets.
     * @example
     * // Create many MediaAssets
     * const mediaAsset = await prisma.mediaAsset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaAssets and only return the `id`
     * const mediaAssetWithIdOnly = await prisma.mediaAsset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaAssetCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MediaAsset.
     * @param {MediaAssetDeleteArgs} args - Arguments to delete one MediaAsset.
     * @example
     * // Delete one MediaAsset
     * const MediaAsset = await prisma.mediaAsset.delete({
     *   where: {
     *     // ... filter to delete one MediaAsset
     *   }
     * })
     * 
     */
    delete<T extends MediaAssetDeleteArgs>(args: SelectSubset<T, MediaAssetDeleteArgs<ExtArgs>>): Prisma__MediaAssetClient<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaAsset.
     * @param {MediaAssetUpdateArgs} args - Arguments to update one MediaAsset.
     * @example
     * // Update one MediaAsset
     * const mediaAsset = await prisma.mediaAsset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaAssetUpdateArgs>(args: SelectSubset<T, MediaAssetUpdateArgs<ExtArgs>>): Prisma__MediaAssetClient<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaAssets.
     * @param {MediaAssetDeleteManyArgs} args - Arguments to filter MediaAssets to delete.
     * @example
     * // Delete a few MediaAssets
     * const { count } = await prisma.mediaAsset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaAssetDeleteManyArgs>(args?: SelectSubset<T, MediaAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaAssets
     * const mediaAsset = await prisma.mediaAsset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaAssetUpdateManyArgs>(args: SelectSubset<T, MediaAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaAssets and returns the data updated in the database.
     * @param {MediaAssetUpdateManyAndReturnArgs} args - Arguments to update many MediaAssets.
     * @example
     * // Update many MediaAssets
     * const mediaAsset = await prisma.mediaAsset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MediaAssets and only return the `id`
     * const mediaAssetWithIdOnly = await prisma.mediaAsset.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaAssetUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MediaAsset.
     * @param {MediaAssetUpsertArgs} args - Arguments to update or create a MediaAsset.
     * @example
     * // Update or create a MediaAsset
     * const mediaAsset = await prisma.mediaAsset.upsert({
     *   create: {
     *     // ... data to create a MediaAsset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaAsset we want to update
     *   }
     * })
     */
    upsert<T extends MediaAssetUpsertArgs>(args: SelectSubset<T, MediaAssetUpsertArgs<ExtArgs>>): Prisma__MediaAssetClient<$Result.GetResult<Prisma.$MediaAssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaAssets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAssetCountArgs} args - Arguments to filter MediaAssets to count.
     * @example
     * // Count the number of MediaAssets
     * const count = await prisma.mediaAsset.count({
     *   where: {
     *     // ... the filter for the MediaAssets we want to count
     *   }
     * })
    **/
    count<T extends MediaAssetCountArgs>(
      args?: Subset<T, MediaAssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaAssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaAssetAggregateArgs>(args: Subset<T, MediaAssetAggregateArgs>): Prisma.PrismaPromise<GetMediaAssetAggregateType<T>>

    /**
     * Group by MediaAsset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAssetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaAssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaAssetGroupByArgs['orderBy'] }
        : { orderBy?: MediaAssetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaAsset model
   */
  readonly fields: MediaAssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaAsset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaAssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediaAsset model
   */
  interface MediaAssetFieldRefs {
    readonly id: FieldRef<"MediaAsset", 'String'>
    readonly url: FieldRef<"MediaAsset", 'String'>
    readonly alt: FieldRef<"MediaAsset", 'String'>
    readonly type: FieldRef<"MediaAsset", 'String'>
    readonly createdAt: FieldRef<"MediaAsset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaAsset findUnique
   */
  export type MediaAssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * Filter, which MediaAsset to fetch.
     */
    where: MediaAssetWhereUniqueInput
  }

  /**
   * MediaAsset findUniqueOrThrow
   */
  export type MediaAssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * Filter, which MediaAsset to fetch.
     */
    where: MediaAssetWhereUniqueInput
  }

  /**
   * MediaAsset findFirst
   */
  export type MediaAssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * Filter, which MediaAsset to fetch.
     */
    where?: MediaAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaAssets to fetch.
     */
    orderBy?: MediaAssetOrderByWithRelationInput | MediaAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaAssets.
     */
    cursor?: MediaAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaAssets.
     */
    distinct?: MediaAssetScalarFieldEnum | MediaAssetScalarFieldEnum[]
  }

  /**
   * MediaAsset findFirstOrThrow
   */
  export type MediaAssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * Filter, which MediaAsset to fetch.
     */
    where?: MediaAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaAssets to fetch.
     */
    orderBy?: MediaAssetOrderByWithRelationInput | MediaAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaAssets.
     */
    cursor?: MediaAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaAssets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaAssets.
     */
    distinct?: MediaAssetScalarFieldEnum | MediaAssetScalarFieldEnum[]
  }

  /**
   * MediaAsset findMany
   */
  export type MediaAssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * Filter, which MediaAssets to fetch.
     */
    where?: MediaAssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaAssets to fetch.
     */
    orderBy?: MediaAssetOrderByWithRelationInput | MediaAssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaAssets.
     */
    cursor?: MediaAssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaAssets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaAssets.
     */
    skip?: number
    distinct?: MediaAssetScalarFieldEnum | MediaAssetScalarFieldEnum[]
  }

  /**
   * MediaAsset create
   */
  export type MediaAssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * The data needed to create a MediaAsset.
     */
    data: XOR<MediaAssetCreateInput, MediaAssetUncheckedCreateInput>
  }

  /**
   * MediaAsset createMany
   */
  export type MediaAssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaAssets.
     */
    data: MediaAssetCreateManyInput | MediaAssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaAsset createManyAndReturn
   */
  export type MediaAssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * The data used to create many MediaAssets.
     */
    data: MediaAssetCreateManyInput | MediaAssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaAsset update
   */
  export type MediaAssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * The data needed to update a MediaAsset.
     */
    data: XOR<MediaAssetUpdateInput, MediaAssetUncheckedUpdateInput>
    /**
     * Choose, which MediaAsset to update.
     */
    where: MediaAssetWhereUniqueInput
  }

  /**
   * MediaAsset updateMany
   */
  export type MediaAssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaAssets.
     */
    data: XOR<MediaAssetUpdateManyMutationInput, MediaAssetUncheckedUpdateManyInput>
    /**
     * Filter which MediaAssets to update
     */
    where?: MediaAssetWhereInput
    /**
     * Limit how many MediaAssets to update.
     */
    limit?: number
  }

  /**
   * MediaAsset updateManyAndReturn
   */
  export type MediaAssetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * The data used to update MediaAssets.
     */
    data: XOR<MediaAssetUpdateManyMutationInput, MediaAssetUncheckedUpdateManyInput>
    /**
     * Filter which MediaAssets to update
     */
    where?: MediaAssetWhereInput
    /**
     * Limit how many MediaAssets to update.
     */
    limit?: number
  }

  /**
   * MediaAsset upsert
   */
  export type MediaAssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * The filter to search for the MediaAsset to update in case it exists.
     */
    where: MediaAssetWhereUniqueInput
    /**
     * In case the MediaAsset found by the `where` argument doesn't exist, create a new MediaAsset with this data.
     */
    create: XOR<MediaAssetCreateInput, MediaAssetUncheckedCreateInput>
    /**
     * In case the MediaAsset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaAssetUpdateInput, MediaAssetUncheckedUpdateInput>
  }

  /**
   * MediaAsset delete
   */
  export type MediaAssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
    /**
     * Filter which MediaAsset to delete.
     */
    where: MediaAssetWhereUniqueInput
  }

  /**
   * MediaAsset deleteMany
   */
  export type MediaAssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaAssets to delete
     */
    where?: MediaAssetWhereInput
    /**
     * Limit how many MediaAssets to delete.
     */
    limit?: number
  }

  /**
   * MediaAsset without action
   */
  export type MediaAssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaAsset
     */
    select?: MediaAssetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaAsset
     */
    omit?: MediaAssetOmit<ExtArgs> | null
  }


  /**
   * Model PortalProject
   */

  export type AggregatePortalProject = {
    _count: PortalProjectCountAggregateOutputType | null
    _min: PortalProjectMinAggregateOutputType | null
    _max: PortalProjectMaxAggregateOutputType | null
  }

  export type PortalProjectMinAggregateOutputType = {
    id: string | null
    clerkUserId: string | null
    name: string | null
    description: string | null
    status: $Enums.PortalProjectStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortalProjectMaxAggregateOutputType = {
    id: string | null
    clerkUserId: string | null
    name: string | null
    description: string | null
    status: $Enums.PortalProjectStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PortalProjectCountAggregateOutputType = {
    id: number
    clerkUserId: number
    name: number
    description: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PortalProjectMinAggregateInputType = {
    id?: true
    clerkUserId?: true
    name?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortalProjectMaxAggregateInputType = {
    id?: true
    clerkUserId?: true
    name?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PortalProjectCountAggregateInputType = {
    id?: true
    clerkUserId?: true
    name?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PortalProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalProject to aggregate.
     */
    where?: PortalProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalProjects to fetch.
     */
    orderBy?: PortalProjectOrderByWithRelationInput | PortalProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortalProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortalProjects
    **/
    _count?: true | PortalProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortalProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortalProjectMaxAggregateInputType
  }

  export type GetPortalProjectAggregateType<T extends PortalProjectAggregateArgs> = {
        [P in keyof T & keyof AggregatePortalProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortalProject[P]>
      : GetScalarType<T[P], AggregatePortalProject[P]>
  }




  export type PortalProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortalProjectWhereInput
    orderBy?: PortalProjectOrderByWithAggregationInput | PortalProjectOrderByWithAggregationInput[]
    by: PortalProjectScalarFieldEnum[] | PortalProjectScalarFieldEnum
    having?: PortalProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortalProjectCountAggregateInputType | true
    _min?: PortalProjectMinAggregateInputType
    _max?: PortalProjectMaxAggregateInputType
  }

  export type PortalProjectGroupByOutputType = {
    id: string
    clerkUserId: string
    name: string
    description: string | null
    status: $Enums.PortalProjectStatus
    createdAt: Date
    updatedAt: Date
    _count: PortalProjectCountAggregateOutputType | null
    _min: PortalProjectMinAggregateOutputType | null
    _max: PortalProjectMaxAggregateOutputType | null
  }

  type GetPortalProjectGroupByPayload<T extends PortalProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortalProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortalProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortalProjectGroupByOutputType[P]>
            : GetScalarType<T[P], PortalProjectGroupByOutputType[P]>
        }
      >
    >


  export type PortalProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    files?: boolean | PortalProject$filesArgs<ExtArgs>
    _count?: boolean | PortalProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portalProject"]>

  export type PortalProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["portalProject"]>

  export type PortalProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["portalProject"]>

  export type PortalProjectSelectScalar = {
    id?: boolean
    clerkUserId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PortalProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkUserId" | "name" | "description" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["portalProject"]>
  export type PortalProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | PortalProject$filesArgs<ExtArgs>
    _count?: boolean | PortalProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PortalProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PortalProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PortalProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortalProject"
    objects: {
      files: Prisma.$PortalProjectFilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkUserId: string
      name: string
      description: string | null
      status: $Enums.PortalProjectStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["portalProject"]>
    composites: {}
  }

  type PortalProjectGetPayload<S extends boolean | null | undefined | PortalProjectDefaultArgs> = $Result.GetResult<Prisma.$PortalProjectPayload, S>

  type PortalProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortalProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortalProjectCountAggregateInputType | true
    }

  export interface PortalProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortalProject'], meta: { name: 'PortalProject' } }
    /**
     * Find zero or one PortalProject that matches the filter.
     * @param {PortalProjectFindUniqueArgs} args - Arguments to find a PortalProject
     * @example
     * // Get one PortalProject
     * const portalProject = await prisma.portalProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortalProjectFindUniqueArgs>(args: SelectSubset<T, PortalProjectFindUniqueArgs<ExtArgs>>): Prisma__PortalProjectClient<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PortalProject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortalProjectFindUniqueOrThrowArgs} args - Arguments to find a PortalProject
     * @example
     * // Get one PortalProject
     * const portalProject = await prisma.portalProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortalProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, PortalProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortalProjectClient<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortalProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFindFirstArgs} args - Arguments to find a PortalProject
     * @example
     * // Get one PortalProject
     * const portalProject = await prisma.portalProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortalProjectFindFirstArgs>(args?: SelectSubset<T, PortalProjectFindFirstArgs<ExtArgs>>): Prisma__PortalProjectClient<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortalProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFindFirstOrThrowArgs} args - Arguments to find a PortalProject
     * @example
     * // Get one PortalProject
     * const portalProject = await prisma.portalProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortalProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, PortalProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortalProjectClient<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PortalProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortalProjects
     * const portalProjects = await prisma.portalProject.findMany()
     * 
     * // Get first 10 PortalProjects
     * const portalProjects = await prisma.portalProject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portalProjectWithIdOnly = await prisma.portalProject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortalProjectFindManyArgs>(args?: SelectSubset<T, PortalProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PortalProject.
     * @param {PortalProjectCreateArgs} args - Arguments to create a PortalProject.
     * @example
     * // Create one PortalProject
     * const PortalProject = await prisma.portalProject.create({
     *   data: {
     *     // ... data to create a PortalProject
     *   }
     * })
     * 
     */
    create<T extends PortalProjectCreateArgs>(args: SelectSubset<T, PortalProjectCreateArgs<ExtArgs>>): Prisma__PortalProjectClient<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PortalProjects.
     * @param {PortalProjectCreateManyArgs} args - Arguments to create many PortalProjects.
     * @example
     * // Create many PortalProjects
     * const portalProject = await prisma.portalProject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortalProjectCreateManyArgs>(args?: SelectSubset<T, PortalProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PortalProjects and returns the data saved in the database.
     * @param {PortalProjectCreateManyAndReturnArgs} args - Arguments to create many PortalProjects.
     * @example
     * // Create many PortalProjects
     * const portalProject = await prisma.portalProject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PortalProjects and only return the `id`
     * const portalProjectWithIdOnly = await prisma.portalProject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortalProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, PortalProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PortalProject.
     * @param {PortalProjectDeleteArgs} args - Arguments to delete one PortalProject.
     * @example
     * // Delete one PortalProject
     * const PortalProject = await prisma.portalProject.delete({
     *   where: {
     *     // ... filter to delete one PortalProject
     *   }
     * })
     * 
     */
    delete<T extends PortalProjectDeleteArgs>(args: SelectSubset<T, PortalProjectDeleteArgs<ExtArgs>>): Prisma__PortalProjectClient<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PortalProject.
     * @param {PortalProjectUpdateArgs} args - Arguments to update one PortalProject.
     * @example
     * // Update one PortalProject
     * const portalProject = await prisma.portalProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortalProjectUpdateArgs>(args: SelectSubset<T, PortalProjectUpdateArgs<ExtArgs>>): Prisma__PortalProjectClient<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PortalProjects.
     * @param {PortalProjectDeleteManyArgs} args - Arguments to filter PortalProjects to delete.
     * @example
     * // Delete a few PortalProjects
     * const { count } = await prisma.portalProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortalProjectDeleteManyArgs>(args?: SelectSubset<T, PortalProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortalProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortalProjects
     * const portalProject = await prisma.portalProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortalProjectUpdateManyArgs>(args: SelectSubset<T, PortalProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortalProjects and returns the data updated in the database.
     * @param {PortalProjectUpdateManyAndReturnArgs} args - Arguments to update many PortalProjects.
     * @example
     * // Update many PortalProjects
     * const portalProject = await prisma.portalProject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PortalProjects and only return the `id`
     * const portalProjectWithIdOnly = await prisma.portalProject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PortalProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, PortalProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PortalProject.
     * @param {PortalProjectUpsertArgs} args - Arguments to update or create a PortalProject.
     * @example
     * // Update or create a PortalProject
     * const portalProject = await prisma.portalProject.upsert({
     *   create: {
     *     // ... data to create a PortalProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortalProject we want to update
     *   }
     * })
     */
    upsert<T extends PortalProjectUpsertArgs>(args: SelectSubset<T, PortalProjectUpsertArgs<ExtArgs>>): Prisma__PortalProjectClient<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PortalProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectCountArgs} args - Arguments to filter PortalProjects to count.
     * @example
     * // Count the number of PortalProjects
     * const count = await prisma.portalProject.count({
     *   where: {
     *     // ... the filter for the PortalProjects we want to count
     *   }
     * })
    **/
    count<T extends PortalProjectCountArgs>(
      args?: Subset<T, PortalProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortalProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortalProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortalProjectAggregateArgs>(args: Subset<T, PortalProjectAggregateArgs>): Prisma.PrismaPromise<GetPortalProjectAggregateType<T>>

    /**
     * Group by PortalProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortalProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortalProjectGroupByArgs['orderBy'] }
        : { orderBy?: PortalProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortalProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortalProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortalProject model
   */
  readonly fields: PortalProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortalProject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortalProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    files<T extends PortalProject$filesArgs<ExtArgs> = {}>(args?: Subset<T, PortalProject$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PortalProject model
   */
  interface PortalProjectFieldRefs {
    readonly id: FieldRef<"PortalProject", 'String'>
    readonly clerkUserId: FieldRef<"PortalProject", 'String'>
    readonly name: FieldRef<"PortalProject", 'String'>
    readonly description: FieldRef<"PortalProject", 'String'>
    readonly status: FieldRef<"PortalProject", 'PortalProjectStatus'>
    readonly createdAt: FieldRef<"PortalProject", 'DateTime'>
    readonly updatedAt: FieldRef<"PortalProject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PortalProject findUnique
   */
  export type PortalProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
    /**
     * Filter, which PortalProject to fetch.
     */
    where: PortalProjectWhereUniqueInput
  }

  /**
   * PortalProject findUniqueOrThrow
   */
  export type PortalProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
    /**
     * Filter, which PortalProject to fetch.
     */
    where: PortalProjectWhereUniqueInput
  }

  /**
   * PortalProject findFirst
   */
  export type PortalProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
    /**
     * Filter, which PortalProject to fetch.
     */
    where?: PortalProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalProjects to fetch.
     */
    orderBy?: PortalProjectOrderByWithRelationInput | PortalProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalProjects.
     */
    cursor?: PortalProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalProjects.
     */
    distinct?: PortalProjectScalarFieldEnum | PortalProjectScalarFieldEnum[]
  }

  /**
   * PortalProject findFirstOrThrow
   */
  export type PortalProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
    /**
     * Filter, which PortalProject to fetch.
     */
    where?: PortalProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalProjects to fetch.
     */
    orderBy?: PortalProjectOrderByWithRelationInput | PortalProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalProjects.
     */
    cursor?: PortalProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalProjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalProjects.
     */
    distinct?: PortalProjectScalarFieldEnum | PortalProjectScalarFieldEnum[]
  }

  /**
   * PortalProject findMany
   */
  export type PortalProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
    /**
     * Filter, which PortalProjects to fetch.
     */
    where?: PortalProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalProjects to fetch.
     */
    orderBy?: PortalProjectOrderByWithRelationInput | PortalProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortalProjects.
     */
    cursor?: PortalProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalProjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalProjects.
     */
    skip?: number
    distinct?: PortalProjectScalarFieldEnum | PortalProjectScalarFieldEnum[]
  }

  /**
   * PortalProject create
   */
  export type PortalProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a PortalProject.
     */
    data: XOR<PortalProjectCreateInput, PortalProjectUncheckedCreateInput>
  }

  /**
   * PortalProject createMany
   */
  export type PortalProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortalProjects.
     */
    data: PortalProjectCreateManyInput | PortalProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortalProject createManyAndReturn
   */
  export type PortalProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * The data used to create many PortalProjects.
     */
    data: PortalProjectCreateManyInput | PortalProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortalProject update
   */
  export type PortalProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a PortalProject.
     */
    data: XOR<PortalProjectUpdateInput, PortalProjectUncheckedUpdateInput>
    /**
     * Choose, which PortalProject to update.
     */
    where: PortalProjectWhereUniqueInput
  }

  /**
   * PortalProject updateMany
   */
  export type PortalProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortalProjects.
     */
    data: XOR<PortalProjectUpdateManyMutationInput, PortalProjectUncheckedUpdateManyInput>
    /**
     * Filter which PortalProjects to update
     */
    where?: PortalProjectWhereInput
    /**
     * Limit how many PortalProjects to update.
     */
    limit?: number
  }

  /**
   * PortalProject updateManyAndReturn
   */
  export type PortalProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * The data used to update PortalProjects.
     */
    data: XOR<PortalProjectUpdateManyMutationInput, PortalProjectUncheckedUpdateManyInput>
    /**
     * Filter which PortalProjects to update
     */
    where?: PortalProjectWhereInput
    /**
     * Limit how many PortalProjects to update.
     */
    limit?: number
  }

  /**
   * PortalProject upsert
   */
  export type PortalProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the PortalProject to update in case it exists.
     */
    where: PortalProjectWhereUniqueInput
    /**
     * In case the PortalProject found by the `where` argument doesn't exist, create a new PortalProject with this data.
     */
    create: XOR<PortalProjectCreateInput, PortalProjectUncheckedCreateInput>
    /**
     * In case the PortalProject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortalProjectUpdateInput, PortalProjectUncheckedUpdateInput>
  }

  /**
   * PortalProject delete
   */
  export type PortalProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
    /**
     * Filter which PortalProject to delete.
     */
    where: PortalProjectWhereUniqueInput
  }

  /**
   * PortalProject deleteMany
   */
  export type PortalProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalProjects to delete
     */
    where?: PortalProjectWhereInput
    /**
     * Limit how many PortalProjects to delete.
     */
    limit?: number
  }

  /**
   * PortalProject.files
   */
  export type PortalProject$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    where?: PortalProjectFileWhereInput
    orderBy?: PortalProjectFileOrderByWithRelationInput | PortalProjectFileOrderByWithRelationInput[]
    cursor?: PortalProjectFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortalProjectFileScalarFieldEnum | PortalProjectFileScalarFieldEnum[]
  }

  /**
   * PortalProject without action
   */
  export type PortalProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProject
     */
    select?: PortalProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProject
     */
    omit?: PortalProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectInclude<ExtArgs> | null
  }


  /**
   * Model PortalProjectFile
   */

  export type AggregatePortalProjectFile = {
    _count: PortalProjectFileCountAggregateOutputType | null
    _avg: PortalProjectFileAvgAggregateOutputType | null
    _sum: PortalProjectFileSumAggregateOutputType | null
    _min: PortalProjectFileMinAggregateOutputType | null
    _max: PortalProjectFileMaxAggregateOutputType | null
  }

  export type PortalProjectFileAvgAggregateOutputType = {
    size: number | null
  }

  export type PortalProjectFileSumAggregateOutputType = {
    size: number | null
  }

  export type PortalProjectFileMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    fileName: string | null
    r2Key: string | null
    size: number | null
    mimeType: string | null
    uploadedByClerkId: string | null
    createdAt: Date | null
  }

  export type PortalProjectFileMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    fileName: string | null
    r2Key: string | null
    size: number | null
    mimeType: string | null
    uploadedByClerkId: string | null
    createdAt: Date | null
  }

  export type PortalProjectFileCountAggregateOutputType = {
    id: number
    projectId: number
    fileName: number
    r2Key: number
    size: number
    mimeType: number
    uploadedByClerkId: number
    createdAt: number
    _all: number
  }


  export type PortalProjectFileAvgAggregateInputType = {
    size?: true
  }

  export type PortalProjectFileSumAggregateInputType = {
    size?: true
  }

  export type PortalProjectFileMinAggregateInputType = {
    id?: true
    projectId?: true
    fileName?: true
    r2Key?: true
    size?: true
    mimeType?: true
    uploadedByClerkId?: true
    createdAt?: true
  }

  export type PortalProjectFileMaxAggregateInputType = {
    id?: true
    projectId?: true
    fileName?: true
    r2Key?: true
    size?: true
    mimeType?: true
    uploadedByClerkId?: true
    createdAt?: true
  }

  export type PortalProjectFileCountAggregateInputType = {
    id?: true
    projectId?: true
    fileName?: true
    r2Key?: true
    size?: true
    mimeType?: true
    uploadedByClerkId?: true
    createdAt?: true
    _all?: true
  }

  export type PortalProjectFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalProjectFile to aggregate.
     */
    where?: PortalProjectFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalProjectFiles to fetch.
     */
    orderBy?: PortalProjectFileOrderByWithRelationInput | PortalProjectFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortalProjectFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalProjectFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalProjectFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortalProjectFiles
    **/
    _count?: true | PortalProjectFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortalProjectFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortalProjectFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortalProjectFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortalProjectFileMaxAggregateInputType
  }

  export type GetPortalProjectFileAggregateType<T extends PortalProjectFileAggregateArgs> = {
        [P in keyof T & keyof AggregatePortalProjectFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortalProjectFile[P]>
      : GetScalarType<T[P], AggregatePortalProjectFile[P]>
  }




  export type PortalProjectFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortalProjectFileWhereInput
    orderBy?: PortalProjectFileOrderByWithAggregationInput | PortalProjectFileOrderByWithAggregationInput[]
    by: PortalProjectFileScalarFieldEnum[] | PortalProjectFileScalarFieldEnum
    having?: PortalProjectFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortalProjectFileCountAggregateInputType | true
    _avg?: PortalProjectFileAvgAggregateInputType
    _sum?: PortalProjectFileSumAggregateInputType
    _min?: PortalProjectFileMinAggregateInputType
    _max?: PortalProjectFileMaxAggregateInputType
  }

  export type PortalProjectFileGroupByOutputType = {
    id: string
    projectId: string
    fileName: string
    r2Key: string
    size: number
    mimeType: string
    uploadedByClerkId: string
    createdAt: Date
    _count: PortalProjectFileCountAggregateOutputType | null
    _avg: PortalProjectFileAvgAggregateOutputType | null
    _sum: PortalProjectFileSumAggregateOutputType | null
    _min: PortalProjectFileMinAggregateOutputType | null
    _max: PortalProjectFileMaxAggregateOutputType | null
  }

  type GetPortalProjectFileGroupByPayload<T extends PortalProjectFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortalProjectFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortalProjectFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortalProjectFileGroupByOutputType[P]>
            : GetScalarType<T[P], PortalProjectFileGroupByOutputType[P]>
        }
      >
    >


  export type PortalProjectFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    fileName?: boolean
    r2Key?: boolean
    size?: boolean
    mimeType?: boolean
    uploadedByClerkId?: boolean
    createdAt?: boolean
    project?: boolean | PortalProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portalProjectFile"]>

  export type PortalProjectFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    fileName?: boolean
    r2Key?: boolean
    size?: boolean
    mimeType?: boolean
    uploadedByClerkId?: boolean
    createdAt?: boolean
    project?: boolean | PortalProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portalProjectFile"]>

  export type PortalProjectFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    fileName?: boolean
    r2Key?: boolean
    size?: boolean
    mimeType?: boolean
    uploadedByClerkId?: boolean
    createdAt?: boolean
    project?: boolean | PortalProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portalProjectFile"]>

  export type PortalProjectFileSelectScalar = {
    id?: boolean
    projectId?: boolean
    fileName?: boolean
    r2Key?: boolean
    size?: boolean
    mimeType?: boolean
    uploadedByClerkId?: boolean
    createdAt?: boolean
  }

  export type PortalProjectFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "fileName" | "r2Key" | "size" | "mimeType" | "uploadedByClerkId" | "createdAt", ExtArgs["result"]["portalProjectFile"]>
  export type PortalProjectFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | PortalProjectDefaultArgs<ExtArgs>
  }
  export type PortalProjectFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | PortalProjectDefaultArgs<ExtArgs>
  }
  export type PortalProjectFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | PortalProjectDefaultArgs<ExtArgs>
  }

  export type $PortalProjectFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortalProjectFile"
    objects: {
      project: Prisma.$PortalProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      fileName: string
      r2Key: string
      size: number
      mimeType: string
      uploadedByClerkId: string
      createdAt: Date
    }, ExtArgs["result"]["portalProjectFile"]>
    composites: {}
  }

  type PortalProjectFileGetPayload<S extends boolean | null | undefined | PortalProjectFileDefaultArgs> = $Result.GetResult<Prisma.$PortalProjectFilePayload, S>

  type PortalProjectFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortalProjectFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortalProjectFileCountAggregateInputType | true
    }

  export interface PortalProjectFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortalProjectFile'], meta: { name: 'PortalProjectFile' } }
    /**
     * Find zero or one PortalProjectFile that matches the filter.
     * @param {PortalProjectFileFindUniqueArgs} args - Arguments to find a PortalProjectFile
     * @example
     * // Get one PortalProjectFile
     * const portalProjectFile = await prisma.portalProjectFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortalProjectFileFindUniqueArgs>(args: SelectSubset<T, PortalProjectFileFindUniqueArgs<ExtArgs>>): Prisma__PortalProjectFileClient<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PortalProjectFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortalProjectFileFindUniqueOrThrowArgs} args - Arguments to find a PortalProjectFile
     * @example
     * // Get one PortalProjectFile
     * const portalProjectFile = await prisma.portalProjectFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortalProjectFileFindUniqueOrThrowArgs>(args: SelectSubset<T, PortalProjectFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortalProjectFileClient<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortalProjectFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFileFindFirstArgs} args - Arguments to find a PortalProjectFile
     * @example
     * // Get one PortalProjectFile
     * const portalProjectFile = await prisma.portalProjectFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortalProjectFileFindFirstArgs>(args?: SelectSubset<T, PortalProjectFileFindFirstArgs<ExtArgs>>): Prisma__PortalProjectFileClient<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortalProjectFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFileFindFirstOrThrowArgs} args - Arguments to find a PortalProjectFile
     * @example
     * // Get one PortalProjectFile
     * const portalProjectFile = await prisma.portalProjectFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortalProjectFileFindFirstOrThrowArgs>(args?: SelectSubset<T, PortalProjectFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortalProjectFileClient<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PortalProjectFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortalProjectFiles
     * const portalProjectFiles = await prisma.portalProjectFile.findMany()
     * 
     * // Get first 10 PortalProjectFiles
     * const portalProjectFiles = await prisma.portalProjectFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portalProjectFileWithIdOnly = await prisma.portalProjectFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortalProjectFileFindManyArgs>(args?: SelectSubset<T, PortalProjectFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PortalProjectFile.
     * @param {PortalProjectFileCreateArgs} args - Arguments to create a PortalProjectFile.
     * @example
     * // Create one PortalProjectFile
     * const PortalProjectFile = await prisma.portalProjectFile.create({
     *   data: {
     *     // ... data to create a PortalProjectFile
     *   }
     * })
     * 
     */
    create<T extends PortalProjectFileCreateArgs>(args: SelectSubset<T, PortalProjectFileCreateArgs<ExtArgs>>): Prisma__PortalProjectFileClient<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PortalProjectFiles.
     * @param {PortalProjectFileCreateManyArgs} args - Arguments to create many PortalProjectFiles.
     * @example
     * // Create many PortalProjectFiles
     * const portalProjectFile = await prisma.portalProjectFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortalProjectFileCreateManyArgs>(args?: SelectSubset<T, PortalProjectFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PortalProjectFiles and returns the data saved in the database.
     * @param {PortalProjectFileCreateManyAndReturnArgs} args - Arguments to create many PortalProjectFiles.
     * @example
     * // Create many PortalProjectFiles
     * const portalProjectFile = await prisma.portalProjectFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PortalProjectFiles and only return the `id`
     * const portalProjectFileWithIdOnly = await prisma.portalProjectFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PortalProjectFileCreateManyAndReturnArgs>(args?: SelectSubset<T, PortalProjectFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PortalProjectFile.
     * @param {PortalProjectFileDeleteArgs} args - Arguments to delete one PortalProjectFile.
     * @example
     * // Delete one PortalProjectFile
     * const PortalProjectFile = await prisma.portalProjectFile.delete({
     *   where: {
     *     // ... filter to delete one PortalProjectFile
     *   }
     * })
     * 
     */
    delete<T extends PortalProjectFileDeleteArgs>(args: SelectSubset<T, PortalProjectFileDeleteArgs<ExtArgs>>): Prisma__PortalProjectFileClient<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PortalProjectFile.
     * @param {PortalProjectFileUpdateArgs} args - Arguments to update one PortalProjectFile.
     * @example
     * // Update one PortalProjectFile
     * const portalProjectFile = await prisma.portalProjectFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortalProjectFileUpdateArgs>(args: SelectSubset<T, PortalProjectFileUpdateArgs<ExtArgs>>): Prisma__PortalProjectFileClient<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PortalProjectFiles.
     * @param {PortalProjectFileDeleteManyArgs} args - Arguments to filter PortalProjectFiles to delete.
     * @example
     * // Delete a few PortalProjectFiles
     * const { count } = await prisma.portalProjectFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortalProjectFileDeleteManyArgs>(args?: SelectSubset<T, PortalProjectFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortalProjectFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortalProjectFiles
     * const portalProjectFile = await prisma.portalProjectFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortalProjectFileUpdateManyArgs>(args: SelectSubset<T, PortalProjectFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortalProjectFiles and returns the data updated in the database.
     * @param {PortalProjectFileUpdateManyAndReturnArgs} args - Arguments to update many PortalProjectFiles.
     * @example
     * // Update many PortalProjectFiles
     * const portalProjectFile = await prisma.portalProjectFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PortalProjectFiles and only return the `id`
     * const portalProjectFileWithIdOnly = await prisma.portalProjectFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PortalProjectFileUpdateManyAndReturnArgs>(args: SelectSubset<T, PortalProjectFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PortalProjectFile.
     * @param {PortalProjectFileUpsertArgs} args - Arguments to update or create a PortalProjectFile.
     * @example
     * // Update or create a PortalProjectFile
     * const portalProjectFile = await prisma.portalProjectFile.upsert({
     *   create: {
     *     // ... data to create a PortalProjectFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortalProjectFile we want to update
     *   }
     * })
     */
    upsert<T extends PortalProjectFileUpsertArgs>(args: SelectSubset<T, PortalProjectFileUpsertArgs<ExtArgs>>): Prisma__PortalProjectFileClient<$Result.GetResult<Prisma.$PortalProjectFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PortalProjectFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFileCountArgs} args - Arguments to filter PortalProjectFiles to count.
     * @example
     * // Count the number of PortalProjectFiles
     * const count = await prisma.portalProjectFile.count({
     *   where: {
     *     // ... the filter for the PortalProjectFiles we want to count
     *   }
     * })
    **/
    count<T extends PortalProjectFileCountArgs>(
      args?: Subset<T, PortalProjectFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortalProjectFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortalProjectFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortalProjectFileAggregateArgs>(args: Subset<T, PortalProjectFileAggregateArgs>): Prisma.PrismaPromise<GetPortalProjectFileAggregateType<T>>

    /**
     * Group by PortalProjectFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortalProjectFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortalProjectFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortalProjectFileGroupByArgs['orderBy'] }
        : { orderBy?: PortalProjectFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortalProjectFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortalProjectFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortalProjectFile model
   */
  readonly fields: PortalProjectFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortalProjectFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortalProjectFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends PortalProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PortalProjectDefaultArgs<ExtArgs>>): Prisma__PortalProjectClient<$Result.GetResult<Prisma.$PortalProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PortalProjectFile model
   */
  interface PortalProjectFileFieldRefs {
    readonly id: FieldRef<"PortalProjectFile", 'String'>
    readonly projectId: FieldRef<"PortalProjectFile", 'String'>
    readonly fileName: FieldRef<"PortalProjectFile", 'String'>
    readonly r2Key: FieldRef<"PortalProjectFile", 'String'>
    readonly size: FieldRef<"PortalProjectFile", 'Int'>
    readonly mimeType: FieldRef<"PortalProjectFile", 'String'>
    readonly uploadedByClerkId: FieldRef<"PortalProjectFile", 'String'>
    readonly createdAt: FieldRef<"PortalProjectFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PortalProjectFile findUnique
   */
  export type PortalProjectFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    /**
     * Filter, which PortalProjectFile to fetch.
     */
    where: PortalProjectFileWhereUniqueInput
  }

  /**
   * PortalProjectFile findUniqueOrThrow
   */
  export type PortalProjectFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    /**
     * Filter, which PortalProjectFile to fetch.
     */
    where: PortalProjectFileWhereUniqueInput
  }

  /**
   * PortalProjectFile findFirst
   */
  export type PortalProjectFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    /**
     * Filter, which PortalProjectFile to fetch.
     */
    where?: PortalProjectFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalProjectFiles to fetch.
     */
    orderBy?: PortalProjectFileOrderByWithRelationInput | PortalProjectFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalProjectFiles.
     */
    cursor?: PortalProjectFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalProjectFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalProjectFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalProjectFiles.
     */
    distinct?: PortalProjectFileScalarFieldEnum | PortalProjectFileScalarFieldEnum[]
  }

  /**
   * PortalProjectFile findFirstOrThrow
   */
  export type PortalProjectFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    /**
     * Filter, which PortalProjectFile to fetch.
     */
    where?: PortalProjectFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalProjectFiles to fetch.
     */
    orderBy?: PortalProjectFileOrderByWithRelationInput | PortalProjectFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortalProjectFiles.
     */
    cursor?: PortalProjectFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalProjectFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalProjectFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortalProjectFiles.
     */
    distinct?: PortalProjectFileScalarFieldEnum | PortalProjectFileScalarFieldEnum[]
  }

  /**
   * PortalProjectFile findMany
   */
  export type PortalProjectFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    /**
     * Filter, which PortalProjectFiles to fetch.
     */
    where?: PortalProjectFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortalProjectFiles to fetch.
     */
    orderBy?: PortalProjectFileOrderByWithRelationInput | PortalProjectFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortalProjectFiles.
     */
    cursor?: PortalProjectFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortalProjectFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortalProjectFiles.
     */
    skip?: number
    distinct?: PortalProjectFileScalarFieldEnum | PortalProjectFileScalarFieldEnum[]
  }

  /**
   * PortalProjectFile create
   */
  export type PortalProjectFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    /**
     * The data needed to create a PortalProjectFile.
     */
    data: XOR<PortalProjectFileCreateInput, PortalProjectFileUncheckedCreateInput>
  }

  /**
   * PortalProjectFile createMany
   */
  export type PortalProjectFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortalProjectFiles.
     */
    data: PortalProjectFileCreateManyInput | PortalProjectFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortalProjectFile createManyAndReturn
   */
  export type PortalProjectFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * The data used to create many PortalProjectFiles.
     */
    data: PortalProjectFileCreateManyInput | PortalProjectFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PortalProjectFile update
   */
  export type PortalProjectFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    /**
     * The data needed to update a PortalProjectFile.
     */
    data: XOR<PortalProjectFileUpdateInput, PortalProjectFileUncheckedUpdateInput>
    /**
     * Choose, which PortalProjectFile to update.
     */
    where: PortalProjectFileWhereUniqueInput
  }

  /**
   * PortalProjectFile updateMany
   */
  export type PortalProjectFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortalProjectFiles.
     */
    data: XOR<PortalProjectFileUpdateManyMutationInput, PortalProjectFileUncheckedUpdateManyInput>
    /**
     * Filter which PortalProjectFiles to update
     */
    where?: PortalProjectFileWhereInput
    /**
     * Limit how many PortalProjectFiles to update.
     */
    limit?: number
  }

  /**
   * PortalProjectFile updateManyAndReturn
   */
  export type PortalProjectFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * The data used to update PortalProjectFiles.
     */
    data: XOR<PortalProjectFileUpdateManyMutationInput, PortalProjectFileUncheckedUpdateManyInput>
    /**
     * Filter which PortalProjectFiles to update
     */
    where?: PortalProjectFileWhereInput
    /**
     * Limit how many PortalProjectFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PortalProjectFile upsert
   */
  export type PortalProjectFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    /**
     * The filter to search for the PortalProjectFile to update in case it exists.
     */
    where: PortalProjectFileWhereUniqueInput
    /**
     * In case the PortalProjectFile found by the `where` argument doesn't exist, create a new PortalProjectFile with this data.
     */
    create: XOR<PortalProjectFileCreateInput, PortalProjectFileUncheckedCreateInput>
    /**
     * In case the PortalProjectFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortalProjectFileUpdateInput, PortalProjectFileUncheckedUpdateInput>
  }

  /**
   * PortalProjectFile delete
   */
  export type PortalProjectFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
    /**
     * Filter which PortalProjectFile to delete.
     */
    where: PortalProjectFileWhereUniqueInput
  }

  /**
   * PortalProjectFile deleteMany
   */
  export type PortalProjectFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortalProjectFiles to delete
     */
    where?: PortalProjectFileWhereInput
    /**
     * Limit how many PortalProjectFiles to delete.
     */
    limit?: number
  }

  /**
   * PortalProjectFile without action
   */
  export type PortalProjectFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortalProjectFile
     */
    select?: PortalProjectFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortalProjectFile
     */
    omit?: PortalProjectFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortalProjectFileInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    active: 'active',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum]


  export const AdminAuditLogScalarFieldEnum: {
    id: 'id',
    adminId: 'adminId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    metadata: 'metadata',
    ipHash: 'ipHash',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type AdminAuditLogScalarFieldEnum = (typeof AdminAuditLogScalarFieldEnum)[keyof typeof AdminAuditLogScalarFieldEnum]


  export const CaseStudyScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    status: 'status',
    featured: 'featured',
    publishedAt: 'publishedAt',
    kicker: 'kicker',
    title: 'title',
    description: 'description',
    role: 'role',
    timeline: 'timeline',
    overview: 'overview',
    challengeIntro: 'challengeIntro',
    challengePoints: 'challengePoints',
    approach: 'approach',
    solution: 'solution',
    results: 'results',
    gallery: 'gallery',
    stats: 'stats',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CaseStudyScalarFieldEnum = (typeof CaseStudyScalarFieldEnum)[keyof typeof CaseStudyScalarFieldEnum]


  export const ContactSubmissionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    selectedPlan: 'selectedPlan',
    message: 'message',
    gdprAccepted: 'gdprAccepted',
    status: 'status',
    contractSigned: 'contractSigned',
    sourcePage: 'sourcePage',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    sessionId: 'sessionId',
    utmSource: 'utmSource',
    utmMedium: 'utmMedium',
    utmCampaign: 'utmCampaign',
    utmContent: 'utmContent',
    utmTerm: 'utmTerm',
    consentAnalytics: 'consentAnalytics',
    emailSent: 'emailSent',
    emailError: 'emailError',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContactSubmissionScalarFieldEnum = (typeof ContactSubmissionScalarFieldEnum)[keyof typeof ContactSubmissionScalarFieldEnum]


  export const AnalyticsSessionScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    consentAnalytics: 'consentAnalytics',
    firstPath: 'firstPath',
    lastPath: 'lastPath',
    referrer: 'referrer',
    utmSource: 'utmSource',
    utmMedium: 'utmMedium',
    utmCampaign: 'utmCampaign',
    utmContent: 'utmContent',
    utmTerm: 'utmTerm',
    deviceType: 'deviceType',
    browser: 'browser',
    ipHash: 'ipHash',
    userAgentHash: 'userAgentHash',
    startedAt: 'startedAt',
    lastSeenAt: 'lastSeenAt',
    convertedAt: 'convertedAt'
  };

  export type AnalyticsSessionScalarFieldEnum = (typeof AnalyticsSessionScalarFieldEnum)[keyof typeof AnalyticsSessionScalarFieldEnum]


  export const AnalyticsEventScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    type: 'type',
    path: 'path',
    label: 'label',
    value: 'value',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AnalyticsEventScalarFieldEnum = (typeof AnalyticsEventScalarFieldEnum)[keyof typeof AnalyticsEventScalarFieldEnum]


  export const PortfolioProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    category: 'category',
    description: 'description',
    image: 'image',
    url: 'url',
    featured: 'featured',
    order: 'order',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortfolioProjectScalarFieldEnum = (typeof PortfolioProjectScalarFieldEnum)[keyof typeof PortfolioProjectScalarFieldEnum]


  export const SiteTextScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    group: 'group',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SiteTextScalarFieldEnum = (typeof SiteTextScalarFieldEnum)[keyof typeof SiteTextScalarFieldEnum]


  export const CompanySettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanySettingScalarFieldEnum = (typeof CompanySettingScalarFieldEnum)[keyof typeof CompanySettingScalarFieldEnum]


  export const MediaAssetScalarFieldEnum: {
    id: 'id',
    url: 'url',
    alt: 'alt',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type MediaAssetScalarFieldEnum = (typeof MediaAssetScalarFieldEnum)[keyof typeof MediaAssetScalarFieldEnum]


  export const PortalProjectScalarFieldEnum: {
    id: 'id',
    clerkUserId: 'clerkUserId',
    name: 'name',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PortalProjectScalarFieldEnum = (typeof PortalProjectScalarFieldEnum)[keyof typeof PortalProjectScalarFieldEnum]


  export const PortalProjectFileScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    fileName: 'fileName',
    r2Key: 'r2Key',
    size: 'size',
    mimeType: 'mimeType',
    uploadedByClerkId: 'uploadedByClerkId',
    createdAt: 'createdAt'
  };

  export type PortalProjectFileScalarFieldEnum = (typeof PortalProjectFileScalarFieldEnum)[keyof typeof PortalProjectFileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AdminRole'
   */
  export type EnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole'>
    


  /**
   * Reference to a field of type 'AdminRole[]'
   */
  export type ListEnumAdminRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'CaseStudyStatus'
   */
  export type EnumCaseStudyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseStudyStatus'>
    


  /**
   * Reference to a field of type 'CaseStudyStatus[]'
   */
  export type ListEnumCaseStudyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseStudyStatus[]'>
    


  /**
   * Reference to a field of type 'ContactStatus'
   */
  export type EnumContactStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContactStatus'>
    


  /**
   * Reference to a field of type 'ContactStatus[]'
   */
  export type ListEnumContactStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContactStatus[]'>
    


  /**
   * Reference to a field of type 'AnalyticsEventType'
   */
  export type EnumAnalyticsEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalyticsEventType'>
    


  /**
   * Reference to a field of type 'AnalyticsEventType[]'
   */
  export type ListEnumAnalyticsEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnalyticsEventType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PortalProjectStatus'
   */
  export type EnumPortalProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PortalProjectStatus'>
    


  /**
   * Reference to a field of type 'PortalProjectStatus[]'
   */
  export type ListEnumPortalProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PortalProjectStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AdminUserWhereInput = {
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    id?: StringFilter<"AdminUser"> | string
    email?: StringFilter<"AdminUser"> | string
    passwordHash?: StringFilter<"AdminUser"> | string
    role?: EnumAdminRoleFilter<"AdminUser"> | $Enums.AdminRole
    active?: BoolFilter<"AdminUser"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
  }

  export type AdminUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    passwordHash?: StringFilter<"AdminUser"> | string
    role?: EnumAdminRoleFilter<"AdminUser"> | $Enums.AdminRole
    active?: BoolFilter<"AdminUser"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
  }, "id" | "email">

  export type AdminUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminUserCountOrderByAggregateInput
    _max?: AdminUserMaxOrderByAggregateInput
    _min?: AdminUserMinOrderByAggregateInput
  }

  export type AdminUserScalarWhereWithAggregatesInput = {
    AND?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    OR?: AdminUserScalarWhereWithAggregatesInput[]
    NOT?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminUser"> | string
    email?: StringWithAggregatesFilter<"AdminUser"> | string
    passwordHash?: StringWithAggregatesFilter<"AdminUser"> | string
    role?: EnumAdminRoleWithAggregatesFilter<"AdminUser"> | $Enums.AdminRole
    active?: BoolWithAggregatesFilter<"AdminUser"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
  }

  export type AdminAuditLogWhereInput = {
    AND?: AdminAuditLogWhereInput | AdminAuditLogWhereInput[]
    OR?: AdminAuditLogWhereInput[]
    NOT?: AdminAuditLogWhereInput | AdminAuditLogWhereInput[]
    id?: StringFilter<"AdminAuditLog"> | string
    adminId?: StringNullableFilter<"AdminAuditLog"> | string | null
    action?: StringFilter<"AdminAuditLog"> | string
    entity?: StringNullableFilter<"AdminAuditLog"> | string | null
    entityId?: StringNullableFilter<"AdminAuditLog"> | string | null
    metadata?: JsonNullableFilter<"AdminAuditLog">
    ipHash?: StringNullableFilter<"AdminAuditLog"> | string | null
    userAgent?: StringNullableFilter<"AdminAuditLog"> | string | null
    createdAt?: DateTimeFilter<"AdminAuditLog"> | Date | string
  }

  export type AdminAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    adminId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipHash?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AdminAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminAuditLogWhereInput | AdminAuditLogWhereInput[]
    OR?: AdminAuditLogWhereInput[]
    NOT?: AdminAuditLogWhereInput | AdminAuditLogWhereInput[]
    adminId?: StringNullableFilter<"AdminAuditLog"> | string | null
    action?: StringFilter<"AdminAuditLog"> | string
    entity?: StringNullableFilter<"AdminAuditLog"> | string | null
    entityId?: StringNullableFilter<"AdminAuditLog"> | string | null
    metadata?: JsonNullableFilter<"AdminAuditLog">
    ipHash?: StringNullableFilter<"AdminAuditLog"> | string | null
    userAgent?: StringNullableFilter<"AdminAuditLog"> | string | null
    createdAt?: DateTimeFilter<"AdminAuditLog"> | Date | string
  }, "id">

  export type AdminAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    adminId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ipHash?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AdminAuditLogCountOrderByAggregateInput
    _max?: AdminAuditLogMaxOrderByAggregateInput
    _min?: AdminAuditLogMinOrderByAggregateInput
  }

  export type AdminAuditLogScalarWhereWithAggregatesInput = {
    AND?: AdminAuditLogScalarWhereWithAggregatesInput | AdminAuditLogScalarWhereWithAggregatesInput[]
    OR?: AdminAuditLogScalarWhereWithAggregatesInput[]
    NOT?: AdminAuditLogScalarWhereWithAggregatesInput | AdminAuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminAuditLog"> | string
    adminId?: StringNullableWithAggregatesFilter<"AdminAuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AdminAuditLog"> | string
    entity?: StringNullableWithAggregatesFilter<"AdminAuditLog"> | string | null
    entityId?: StringNullableWithAggregatesFilter<"AdminAuditLog"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AdminAuditLog">
    ipHash?: StringNullableWithAggregatesFilter<"AdminAuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AdminAuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminAuditLog"> | Date | string
  }

  export type CaseStudyWhereInput = {
    AND?: CaseStudyWhereInput | CaseStudyWhereInput[]
    OR?: CaseStudyWhereInput[]
    NOT?: CaseStudyWhereInput | CaseStudyWhereInput[]
    id?: StringFilter<"CaseStudy"> | string
    slug?: StringFilter<"CaseStudy"> | string
    status?: EnumCaseStudyStatusFilter<"CaseStudy"> | $Enums.CaseStudyStatus
    featured?: BoolFilter<"CaseStudy"> | boolean
    publishedAt?: DateTimeNullableFilter<"CaseStudy"> | Date | string | null
    kicker?: StringFilter<"CaseStudy"> | string
    title?: StringFilter<"CaseStudy"> | string
    description?: StringFilter<"CaseStudy"> | string
    role?: StringFilter<"CaseStudy"> | string
    timeline?: StringFilter<"CaseStudy"> | string
    overview?: StringFilter<"CaseStudy"> | string
    challengeIntro?: StringFilter<"CaseStudy"> | string
    challengePoints?: JsonFilter<"CaseStudy">
    approach?: JsonFilter<"CaseStudy">
    solution?: StringFilter<"CaseStudy"> | string
    results?: StringFilter<"CaseStudy"> | string
    gallery?: JsonFilter<"CaseStudy">
    stats?: JsonFilter<"CaseStudy">
    metaTitle?: StringNullableFilter<"CaseStudy"> | string | null
    metaDescription?: StringNullableFilter<"CaseStudy"> | string | null
    createdAt?: DateTimeFilter<"CaseStudy"> | Date | string
    updatedAt?: DateTimeFilter<"CaseStudy"> | Date | string
  }

  export type CaseStudyOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    kicker?: SortOrder
    title?: SortOrder
    description?: SortOrder
    role?: SortOrder
    timeline?: SortOrder
    overview?: SortOrder
    challengeIntro?: SortOrder
    challengePoints?: SortOrder
    approach?: SortOrder
    solution?: SortOrder
    results?: SortOrder
    gallery?: SortOrder
    stats?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseStudyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CaseStudyWhereInput | CaseStudyWhereInput[]
    OR?: CaseStudyWhereInput[]
    NOT?: CaseStudyWhereInput | CaseStudyWhereInput[]
    status?: EnumCaseStudyStatusFilter<"CaseStudy"> | $Enums.CaseStudyStatus
    featured?: BoolFilter<"CaseStudy"> | boolean
    publishedAt?: DateTimeNullableFilter<"CaseStudy"> | Date | string | null
    kicker?: StringFilter<"CaseStudy"> | string
    title?: StringFilter<"CaseStudy"> | string
    description?: StringFilter<"CaseStudy"> | string
    role?: StringFilter<"CaseStudy"> | string
    timeline?: StringFilter<"CaseStudy"> | string
    overview?: StringFilter<"CaseStudy"> | string
    challengeIntro?: StringFilter<"CaseStudy"> | string
    challengePoints?: JsonFilter<"CaseStudy">
    approach?: JsonFilter<"CaseStudy">
    solution?: StringFilter<"CaseStudy"> | string
    results?: StringFilter<"CaseStudy"> | string
    gallery?: JsonFilter<"CaseStudy">
    stats?: JsonFilter<"CaseStudy">
    metaTitle?: StringNullableFilter<"CaseStudy"> | string | null
    metaDescription?: StringNullableFilter<"CaseStudy"> | string | null
    createdAt?: DateTimeFilter<"CaseStudy"> | Date | string
    updatedAt?: DateTimeFilter<"CaseStudy"> | Date | string
  }, "id" | "slug">

  export type CaseStudyOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    kicker?: SortOrder
    title?: SortOrder
    description?: SortOrder
    role?: SortOrder
    timeline?: SortOrder
    overview?: SortOrder
    challengeIntro?: SortOrder
    challengePoints?: SortOrder
    approach?: SortOrder
    solution?: SortOrder
    results?: SortOrder
    gallery?: SortOrder
    stats?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CaseStudyCountOrderByAggregateInput
    _max?: CaseStudyMaxOrderByAggregateInput
    _min?: CaseStudyMinOrderByAggregateInput
  }

  export type CaseStudyScalarWhereWithAggregatesInput = {
    AND?: CaseStudyScalarWhereWithAggregatesInput | CaseStudyScalarWhereWithAggregatesInput[]
    OR?: CaseStudyScalarWhereWithAggregatesInput[]
    NOT?: CaseStudyScalarWhereWithAggregatesInput | CaseStudyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseStudy"> | string
    slug?: StringWithAggregatesFilter<"CaseStudy"> | string
    status?: EnumCaseStudyStatusWithAggregatesFilter<"CaseStudy"> | $Enums.CaseStudyStatus
    featured?: BoolWithAggregatesFilter<"CaseStudy"> | boolean
    publishedAt?: DateTimeNullableWithAggregatesFilter<"CaseStudy"> | Date | string | null
    kicker?: StringWithAggregatesFilter<"CaseStudy"> | string
    title?: StringWithAggregatesFilter<"CaseStudy"> | string
    description?: StringWithAggregatesFilter<"CaseStudy"> | string
    role?: StringWithAggregatesFilter<"CaseStudy"> | string
    timeline?: StringWithAggregatesFilter<"CaseStudy"> | string
    overview?: StringWithAggregatesFilter<"CaseStudy"> | string
    challengeIntro?: StringWithAggregatesFilter<"CaseStudy"> | string
    challengePoints?: JsonWithAggregatesFilter<"CaseStudy">
    approach?: JsonWithAggregatesFilter<"CaseStudy">
    solution?: StringWithAggregatesFilter<"CaseStudy"> | string
    results?: StringWithAggregatesFilter<"CaseStudy"> | string
    gallery?: JsonWithAggregatesFilter<"CaseStudy">
    stats?: JsonWithAggregatesFilter<"CaseStudy">
    metaTitle?: StringNullableWithAggregatesFilter<"CaseStudy"> | string | null
    metaDescription?: StringNullableWithAggregatesFilter<"CaseStudy"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CaseStudy"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CaseStudy"> | Date | string
  }

  export type ContactSubmissionWhereInput = {
    AND?: ContactSubmissionWhereInput | ContactSubmissionWhereInput[]
    OR?: ContactSubmissionWhereInput[]
    NOT?: ContactSubmissionWhereInput | ContactSubmissionWhereInput[]
    id?: StringFilter<"ContactSubmission"> | string
    name?: StringFilter<"ContactSubmission"> | string
    email?: StringFilter<"ContactSubmission"> | string
    phone?: StringNullableFilter<"ContactSubmission"> | string | null
    selectedPlan?: StringNullableFilter<"ContactSubmission"> | string | null
    message?: StringFilter<"ContactSubmission"> | string
    gdprAccepted?: BoolFilter<"ContactSubmission"> | boolean
    status?: EnumContactStatusFilter<"ContactSubmission"> | $Enums.ContactStatus
    contractSigned?: BoolFilter<"ContactSubmission"> | boolean
    sourcePage?: StringNullableFilter<"ContactSubmission"> | string | null
    userAgent?: StringNullableFilter<"ContactSubmission"> | string | null
    ipAddress?: StringNullableFilter<"ContactSubmission"> | string | null
    sessionId?: StringNullableFilter<"ContactSubmission"> | string | null
    utmSource?: StringNullableFilter<"ContactSubmission"> | string | null
    utmMedium?: StringNullableFilter<"ContactSubmission"> | string | null
    utmCampaign?: StringNullableFilter<"ContactSubmission"> | string | null
    utmContent?: StringNullableFilter<"ContactSubmission"> | string | null
    utmTerm?: StringNullableFilter<"ContactSubmission"> | string | null
    consentAnalytics?: BoolFilter<"ContactSubmission"> | boolean
    emailSent?: BoolFilter<"ContactSubmission"> | boolean
    emailError?: StringNullableFilter<"ContactSubmission"> | string | null
    createdAt?: DateTimeFilter<"ContactSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"ContactSubmission"> | Date | string
  }

  export type ContactSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    selectedPlan?: SortOrderInput | SortOrder
    message?: SortOrder
    gdprAccepted?: SortOrder
    status?: SortOrder
    contractSigned?: SortOrder
    sourcePage?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    utmSource?: SortOrderInput | SortOrder
    utmMedium?: SortOrderInput | SortOrder
    utmCampaign?: SortOrderInput | SortOrder
    utmContent?: SortOrderInput | SortOrder
    utmTerm?: SortOrderInput | SortOrder
    consentAnalytics?: SortOrder
    emailSent?: SortOrder
    emailError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactSubmissionWhereInput | ContactSubmissionWhereInput[]
    OR?: ContactSubmissionWhereInput[]
    NOT?: ContactSubmissionWhereInput | ContactSubmissionWhereInput[]
    name?: StringFilter<"ContactSubmission"> | string
    email?: StringFilter<"ContactSubmission"> | string
    phone?: StringNullableFilter<"ContactSubmission"> | string | null
    selectedPlan?: StringNullableFilter<"ContactSubmission"> | string | null
    message?: StringFilter<"ContactSubmission"> | string
    gdprAccepted?: BoolFilter<"ContactSubmission"> | boolean
    status?: EnumContactStatusFilter<"ContactSubmission"> | $Enums.ContactStatus
    contractSigned?: BoolFilter<"ContactSubmission"> | boolean
    sourcePage?: StringNullableFilter<"ContactSubmission"> | string | null
    userAgent?: StringNullableFilter<"ContactSubmission"> | string | null
    ipAddress?: StringNullableFilter<"ContactSubmission"> | string | null
    sessionId?: StringNullableFilter<"ContactSubmission"> | string | null
    utmSource?: StringNullableFilter<"ContactSubmission"> | string | null
    utmMedium?: StringNullableFilter<"ContactSubmission"> | string | null
    utmCampaign?: StringNullableFilter<"ContactSubmission"> | string | null
    utmContent?: StringNullableFilter<"ContactSubmission"> | string | null
    utmTerm?: StringNullableFilter<"ContactSubmission"> | string | null
    consentAnalytics?: BoolFilter<"ContactSubmission"> | boolean
    emailSent?: BoolFilter<"ContactSubmission"> | boolean
    emailError?: StringNullableFilter<"ContactSubmission"> | string | null
    createdAt?: DateTimeFilter<"ContactSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"ContactSubmission"> | Date | string
  }, "id">

  export type ContactSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    selectedPlan?: SortOrderInput | SortOrder
    message?: SortOrder
    gdprAccepted?: SortOrder
    status?: SortOrder
    contractSigned?: SortOrder
    sourcePage?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    utmSource?: SortOrderInput | SortOrder
    utmMedium?: SortOrderInput | SortOrder
    utmCampaign?: SortOrderInput | SortOrder
    utmContent?: SortOrderInput | SortOrder
    utmTerm?: SortOrderInput | SortOrder
    consentAnalytics?: SortOrder
    emailSent?: SortOrder
    emailError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactSubmissionCountOrderByAggregateInput
    _max?: ContactSubmissionMaxOrderByAggregateInput
    _min?: ContactSubmissionMinOrderByAggregateInput
  }

  export type ContactSubmissionScalarWhereWithAggregatesInput = {
    AND?: ContactSubmissionScalarWhereWithAggregatesInput | ContactSubmissionScalarWhereWithAggregatesInput[]
    OR?: ContactSubmissionScalarWhereWithAggregatesInput[]
    NOT?: ContactSubmissionScalarWhereWithAggregatesInput | ContactSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContactSubmission"> | string
    name?: StringWithAggregatesFilter<"ContactSubmission"> | string
    email?: StringWithAggregatesFilter<"ContactSubmission"> | string
    phone?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    selectedPlan?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    message?: StringWithAggregatesFilter<"ContactSubmission"> | string
    gdprAccepted?: BoolWithAggregatesFilter<"ContactSubmission"> | boolean
    status?: EnumContactStatusWithAggregatesFilter<"ContactSubmission"> | $Enums.ContactStatus
    contractSigned?: BoolWithAggregatesFilter<"ContactSubmission"> | boolean
    sourcePage?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    sessionId?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    utmSource?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    utmMedium?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    utmCampaign?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    utmContent?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    utmTerm?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    consentAnalytics?: BoolWithAggregatesFilter<"ContactSubmission"> | boolean
    emailSent?: BoolWithAggregatesFilter<"ContactSubmission"> | boolean
    emailError?: StringNullableWithAggregatesFilter<"ContactSubmission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ContactSubmission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContactSubmission"> | Date | string
  }

  export type AnalyticsSessionWhereInput = {
    AND?: AnalyticsSessionWhereInput | AnalyticsSessionWhereInput[]
    OR?: AnalyticsSessionWhereInput[]
    NOT?: AnalyticsSessionWhereInput | AnalyticsSessionWhereInput[]
    id?: StringFilter<"AnalyticsSession"> | string
    sessionId?: StringFilter<"AnalyticsSession"> | string
    consentAnalytics?: BoolFilter<"AnalyticsSession"> | boolean
    firstPath?: StringNullableFilter<"AnalyticsSession"> | string | null
    lastPath?: StringNullableFilter<"AnalyticsSession"> | string | null
    referrer?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmSource?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmMedium?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmCampaign?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmContent?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmTerm?: StringNullableFilter<"AnalyticsSession"> | string | null
    deviceType?: StringNullableFilter<"AnalyticsSession"> | string | null
    browser?: StringNullableFilter<"AnalyticsSession"> | string | null
    ipHash?: StringNullableFilter<"AnalyticsSession"> | string | null
    userAgentHash?: StringNullableFilter<"AnalyticsSession"> | string | null
    startedAt?: DateTimeFilter<"AnalyticsSession"> | Date | string
    lastSeenAt?: DateTimeFilter<"AnalyticsSession"> | Date | string
    convertedAt?: DateTimeNullableFilter<"AnalyticsSession"> | Date | string | null
    events?: AnalyticsEventListRelationFilter
  }

  export type AnalyticsSessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    consentAnalytics?: SortOrder
    firstPath?: SortOrderInput | SortOrder
    lastPath?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    utmSource?: SortOrderInput | SortOrder
    utmMedium?: SortOrderInput | SortOrder
    utmCampaign?: SortOrderInput | SortOrder
    utmContent?: SortOrderInput | SortOrder
    utmTerm?: SortOrderInput | SortOrder
    deviceType?: SortOrderInput | SortOrder
    browser?: SortOrderInput | SortOrder
    ipHash?: SortOrderInput | SortOrder
    userAgentHash?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    lastSeenAt?: SortOrder
    convertedAt?: SortOrderInput | SortOrder
    events?: AnalyticsEventOrderByRelationAggregateInput
  }

  export type AnalyticsSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: AnalyticsSessionWhereInput | AnalyticsSessionWhereInput[]
    OR?: AnalyticsSessionWhereInput[]
    NOT?: AnalyticsSessionWhereInput | AnalyticsSessionWhereInput[]
    consentAnalytics?: BoolFilter<"AnalyticsSession"> | boolean
    firstPath?: StringNullableFilter<"AnalyticsSession"> | string | null
    lastPath?: StringNullableFilter<"AnalyticsSession"> | string | null
    referrer?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmSource?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmMedium?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmCampaign?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmContent?: StringNullableFilter<"AnalyticsSession"> | string | null
    utmTerm?: StringNullableFilter<"AnalyticsSession"> | string | null
    deviceType?: StringNullableFilter<"AnalyticsSession"> | string | null
    browser?: StringNullableFilter<"AnalyticsSession"> | string | null
    ipHash?: StringNullableFilter<"AnalyticsSession"> | string | null
    userAgentHash?: StringNullableFilter<"AnalyticsSession"> | string | null
    startedAt?: DateTimeFilter<"AnalyticsSession"> | Date | string
    lastSeenAt?: DateTimeFilter<"AnalyticsSession"> | Date | string
    convertedAt?: DateTimeNullableFilter<"AnalyticsSession"> | Date | string | null
    events?: AnalyticsEventListRelationFilter
  }, "id" | "sessionId">

  export type AnalyticsSessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    consentAnalytics?: SortOrder
    firstPath?: SortOrderInput | SortOrder
    lastPath?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    utmSource?: SortOrderInput | SortOrder
    utmMedium?: SortOrderInput | SortOrder
    utmCampaign?: SortOrderInput | SortOrder
    utmContent?: SortOrderInput | SortOrder
    utmTerm?: SortOrderInput | SortOrder
    deviceType?: SortOrderInput | SortOrder
    browser?: SortOrderInput | SortOrder
    ipHash?: SortOrderInput | SortOrder
    userAgentHash?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    lastSeenAt?: SortOrder
    convertedAt?: SortOrderInput | SortOrder
    _count?: AnalyticsSessionCountOrderByAggregateInput
    _max?: AnalyticsSessionMaxOrderByAggregateInput
    _min?: AnalyticsSessionMinOrderByAggregateInput
  }

  export type AnalyticsSessionScalarWhereWithAggregatesInput = {
    AND?: AnalyticsSessionScalarWhereWithAggregatesInput | AnalyticsSessionScalarWhereWithAggregatesInput[]
    OR?: AnalyticsSessionScalarWhereWithAggregatesInput[]
    NOT?: AnalyticsSessionScalarWhereWithAggregatesInput | AnalyticsSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalyticsSession"> | string
    sessionId?: StringWithAggregatesFilter<"AnalyticsSession"> | string
    consentAnalytics?: BoolWithAggregatesFilter<"AnalyticsSession"> | boolean
    firstPath?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    lastPath?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    referrer?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    utmSource?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    utmMedium?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    utmCampaign?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    utmContent?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    utmTerm?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    deviceType?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    browser?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    ipHash?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    userAgentHash?: StringNullableWithAggregatesFilter<"AnalyticsSession"> | string | null
    startedAt?: DateTimeWithAggregatesFilter<"AnalyticsSession"> | Date | string
    lastSeenAt?: DateTimeWithAggregatesFilter<"AnalyticsSession"> | Date | string
    convertedAt?: DateTimeNullableWithAggregatesFilter<"AnalyticsSession"> | Date | string | null
  }

  export type AnalyticsEventWhereInput = {
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    id?: StringFilter<"AnalyticsEvent"> | string
    sessionId?: StringFilter<"AnalyticsEvent"> | string
    type?: EnumAnalyticsEventTypeFilter<"AnalyticsEvent"> | $Enums.AnalyticsEventType
    path?: StringNullableFilter<"AnalyticsEvent"> | string | null
    label?: StringNullableFilter<"AnalyticsEvent"> | string | null
    value?: StringNullableFilter<"AnalyticsEvent"> | string | null
    metadata?: JsonNullableFilter<"AnalyticsEvent">
    createdAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
    session?: XOR<AnalyticsSessionScalarRelationFilter, AnalyticsSessionWhereInput>
  }

  export type AnalyticsEventOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    path?: SortOrderInput | SortOrder
    label?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: AnalyticsSessionOrderByWithRelationInput
  }

  export type AnalyticsEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    sessionId?: StringFilter<"AnalyticsEvent"> | string
    type?: EnumAnalyticsEventTypeFilter<"AnalyticsEvent"> | $Enums.AnalyticsEventType
    path?: StringNullableFilter<"AnalyticsEvent"> | string | null
    label?: StringNullableFilter<"AnalyticsEvent"> | string | null
    value?: StringNullableFilter<"AnalyticsEvent"> | string | null
    metadata?: JsonNullableFilter<"AnalyticsEvent">
    createdAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
    session?: XOR<AnalyticsSessionScalarRelationFilter, AnalyticsSessionWhereInput>
  }, "id">

  export type AnalyticsEventOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    path?: SortOrderInput | SortOrder
    label?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AnalyticsEventCountOrderByAggregateInput
    _max?: AnalyticsEventMaxOrderByAggregateInput
    _min?: AnalyticsEventMinOrderByAggregateInput
  }

  export type AnalyticsEventScalarWhereWithAggregatesInput = {
    AND?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    OR?: AnalyticsEventScalarWhereWithAggregatesInput[]
    NOT?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    sessionId?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    type?: EnumAnalyticsEventTypeWithAggregatesFilter<"AnalyticsEvent"> | $Enums.AnalyticsEventType
    path?: StringNullableWithAggregatesFilter<"AnalyticsEvent"> | string | null
    label?: StringNullableWithAggregatesFilter<"AnalyticsEvent"> | string | null
    value?: StringNullableWithAggregatesFilter<"AnalyticsEvent"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AnalyticsEvent">
    createdAt?: DateTimeWithAggregatesFilter<"AnalyticsEvent"> | Date | string
  }

  export type PortfolioProjectWhereInput = {
    AND?: PortfolioProjectWhereInput | PortfolioProjectWhereInput[]
    OR?: PortfolioProjectWhereInput[]
    NOT?: PortfolioProjectWhereInput | PortfolioProjectWhereInput[]
    id?: StringFilter<"PortfolioProject"> | string
    title?: StringFilter<"PortfolioProject"> | string
    slug?: StringFilter<"PortfolioProject"> | string
    category?: StringNullableFilter<"PortfolioProject"> | string | null
    description?: StringFilter<"PortfolioProject"> | string
    image?: StringNullableFilter<"PortfolioProject"> | string | null
    url?: StringNullableFilter<"PortfolioProject"> | string | null
    featured?: BoolFilter<"PortfolioProject"> | boolean
    order?: IntFilter<"PortfolioProject"> | number
    published?: BoolFilter<"PortfolioProject"> | boolean
    createdAt?: DateTimeFilter<"PortfolioProject"> | Date | string
    updatedAt?: DateTimeFilter<"PortfolioProject"> | Date | string
  }

  export type PortfolioProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrder
    image?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    featured?: SortOrder
    order?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: PortfolioProjectWhereInput | PortfolioProjectWhereInput[]
    OR?: PortfolioProjectWhereInput[]
    NOT?: PortfolioProjectWhereInput | PortfolioProjectWhereInput[]
    title?: StringFilter<"PortfolioProject"> | string
    category?: StringNullableFilter<"PortfolioProject"> | string | null
    description?: StringFilter<"PortfolioProject"> | string
    image?: StringNullableFilter<"PortfolioProject"> | string | null
    url?: StringNullableFilter<"PortfolioProject"> | string | null
    featured?: BoolFilter<"PortfolioProject"> | boolean
    order?: IntFilter<"PortfolioProject"> | number
    published?: BoolFilter<"PortfolioProject"> | boolean
    createdAt?: DateTimeFilter<"PortfolioProject"> | Date | string
    updatedAt?: DateTimeFilter<"PortfolioProject"> | Date | string
  }, "id" | "slug">

  export type PortfolioProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrder
    image?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    featured?: SortOrder
    order?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortfolioProjectCountOrderByAggregateInput
    _avg?: PortfolioProjectAvgOrderByAggregateInput
    _max?: PortfolioProjectMaxOrderByAggregateInput
    _min?: PortfolioProjectMinOrderByAggregateInput
    _sum?: PortfolioProjectSumOrderByAggregateInput
  }

  export type PortfolioProjectScalarWhereWithAggregatesInput = {
    AND?: PortfolioProjectScalarWhereWithAggregatesInput | PortfolioProjectScalarWhereWithAggregatesInput[]
    OR?: PortfolioProjectScalarWhereWithAggregatesInput[]
    NOT?: PortfolioProjectScalarWhereWithAggregatesInput | PortfolioProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PortfolioProject"> | string
    title?: StringWithAggregatesFilter<"PortfolioProject"> | string
    slug?: StringWithAggregatesFilter<"PortfolioProject"> | string
    category?: StringNullableWithAggregatesFilter<"PortfolioProject"> | string | null
    description?: StringWithAggregatesFilter<"PortfolioProject"> | string
    image?: StringNullableWithAggregatesFilter<"PortfolioProject"> | string | null
    url?: StringNullableWithAggregatesFilter<"PortfolioProject"> | string | null
    featured?: BoolWithAggregatesFilter<"PortfolioProject"> | boolean
    order?: IntWithAggregatesFilter<"PortfolioProject"> | number
    published?: BoolWithAggregatesFilter<"PortfolioProject"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PortfolioProject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PortfolioProject"> | Date | string
  }

  export type SiteTextWhereInput = {
    AND?: SiteTextWhereInput | SiteTextWhereInput[]
    OR?: SiteTextWhereInput[]
    NOT?: SiteTextWhereInput | SiteTextWhereInput[]
    id?: StringFilter<"SiteText"> | string
    key?: StringFilter<"SiteText"> | string
    value?: StringFilter<"SiteText"> | string
    group?: StringNullableFilter<"SiteText"> | string | null
    createdAt?: DateTimeFilter<"SiteText"> | Date | string
    updatedAt?: DateTimeFilter<"SiteText"> | Date | string
  }

  export type SiteTextOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteTextWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SiteTextWhereInput | SiteTextWhereInput[]
    OR?: SiteTextWhereInput[]
    NOT?: SiteTextWhereInput | SiteTextWhereInput[]
    value?: StringFilter<"SiteText"> | string
    group?: StringNullableFilter<"SiteText"> | string | null
    createdAt?: DateTimeFilter<"SiteText"> | Date | string
    updatedAt?: DateTimeFilter<"SiteText"> | Date | string
  }, "id" | "key">

  export type SiteTextOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SiteTextCountOrderByAggregateInput
    _max?: SiteTextMaxOrderByAggregateInput
    _min?: SiteTextMinOrderByAggregateInput
  }

  export type SiteTextScalarWhereWithAggregatesInput = {
    AND?: SiteTextScalarWhereWithAggregatesInput | SiteTextScalarWhereWithAggregatesInput[]
    OR?: SiteTextScalarWhereWithAggregatesInput[]
    NOT?: SiteTextScalarWhereWithAggregatesInput | SiteTextScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SiteText"> | string
    key?: StringWithAggregatesFilter<"SiteText"> | string
    value?: StringWithAggregatesFilter<"SiteText"> | string
    group?: StringNullableWithAggregatesFilter<"SiteText"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SiteText"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SiteText"> | Date | string
  }

  export type CompanySettingWhereInput = {
    AND?: CompanySettingWhereInput | CompanySettingWhereInput[]
    OR?: CompanySettingWhereInput[]
    NOT?: CompanySettingWhereInput | CompanySettingWhereInput[]
    id?: StringFilter<"CompanySetting"> | string
    key?: StringFilter<"CompanySetting"> | string
    value?: StringFilter<"CompanySetting"> | string
    createdAt?: DateTimeFilter<"CompanySetting"> | Date | string
    updatedAt?: DateTimeFilter<"CompanySetting"> | Date | string
  }

  export type CompanySettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: CompanySettingWhereInput | CompanySettingWhereInput[]
    OR?: CompanySettingWhereInput[]
    NOT?: CompanySettingWhereInput | CompanySettingWhereInput[]
    value?: StringFilter<"CompanySetting"> | string
    createdAt?: DateTimeFilter<"CompanySetting"> | Date | string
    updatedAt?: DateTimeFilter<"CompanySetting"> | Date | string
  }, "id" | "key">

  export type CompanySettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanySettingCountOrderByAggregateInput
    _max?: CompanySettingMaxOrderByAggregateInput
    _min?: CompanySettingMinOrderByAggregateInput
  }

  export type CompanySettingScalarWhereWithAggregatesInput = {
    AND?: CompanySettingScalarWhereWithAggregatesInput | CompanySettingScalarWhereWithAggregatesInput[]
    OR?: CompanySettingScalarWhereWithAggregatesInput[]
    NOT?: CompanySettingScalarWhereWithAggregatesInput | CompanySettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompanySetting"> | string
    key?: StringWithAggregatesFilter<"CompanySetting"> | string
    value?: StringWithAggregatesFilter<"CompanySetting"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CompanySetting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CompanySetting"> | Date | string
  }

  export type MediaAssetWhereInput = {
    AND?: MediaAssetWhereInput | MediaAssetWhereInput[]
    OR?: MediaAssetWhereInput[]
    NOT?: MediaAssetWhereInput | MediaAssetWhereInput[]
    id?: StringFilter<"MediaAsset"> | string
    url?: StringFilter<"MediaAsset"> | string
    alt?: StringNullableFilter<"MediaAsset"> | string | null
    type?: StringNullableFilter<"MediaAsset"> | string | null
    createdAt?: DateTimeFilter<"MediaAsset"> | Date | string
  }

  export type MediaAssetOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type MediaAssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MediaAssetWhereInput | MediaAssetWhereInput[]
    OR?: MediaAssetWhereInput[]
    NOT?: MediaAssetWhereInput | MediaAssetWhereInput[]
    url?: StringFilter<"MediaAsset"> | string
    alt?: StringNullableFilter<"MediaAsset"> | string | null
    type?: StringNullableFilter<"MediaAsset"> | string | null
    createdAt?: DateTimeFilter<"MediaAsset"> | Date | string
  }, "id">

  export type MediaAssetOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MediaAssetCountOrderByAggregateInput
    _max?: MediaAssetMaxOrderByAggregateInput
    _min?: MediaAssetMinOrderByAggregateInput
  }

  export type MediaAssetScalarWhereWithAggregatesInput = {
    AND?: MediaAssetScalarWhereWithAggregatesInput | MediaAssetScalarWhereWithAggregatesInput[]
    OR?: MediaAssetScalarWhereWithAggregatesInput[]
    NOT?: MediaAssetScalarWhereWithAggregatesInput | MediaAssetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MediaAsset"> | string
    url?: StringWithAggregatesFilter<"MediaAsset"> | string
    alt?: StringNullableWithAggregatesFilter<"MediaAsset"> | string | null
    type?: StringNullableWithAggregatesFilter<"MediaAsset"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MediaAsset"> | Date | string
  }

  export type PortalProjectWhereInput = {
    AND?: PortalProjectWhereInput | PortalProjectWhereInput[]
    OR?: PortalProjectWhereInput[]
    NOT?: PortalProjectWhereInput | PortalProjectWhereInput[]
    id?: StringFilter<"PortalProject"> | string
    clerkUserId?: StringFilter<"PortalProject"> | string
    name?: StringFilter<"PortalProject"> | string
    description?: StringNullableFilter<"PortalProject"> | string | null
    status?: EnumPortalProjectStatusFilter<"PortalProject"> | $Enums.PortalProjectStatus
    createdAt?: DateTimeFilter<"PortalProject"> | Date | string
    updatedAt?: DateTimeFilter<"PortalProject"> | Date | string
    files?: PortalProjectFileListRelationFilter
  }

  export type PortalProjectOrderByWithRelationInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    files?: PortalProjectFileOrderByRelationAggregateInput
  }

  export type PortalProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortalProjectWhereInput | PortalProjectWhereInput[]
    OR?: PortalProjectWhereInput[]
    NOT?: PortalProjectWhereInput | PortalProjectWhereInput[]
    clerkUserId?: StringFilter<"PortalProject"> | string
    name?: StringFilter<"PortalProject"> | string
    description?: StringNullableFilter<"PortalProject"> | string | null
    status?: EnumPortalProjectStatusFilter<"PortalProject"> | $Enums.PortalProjectStatus
    createdAt?: DateTimeFilter<"PortalProject"> | Date | string
    updatedAt?: DateTimeFilter<"PortalProject"> | Date | string
    files?: PortalProjectFileListRelationFilter
  }, "id">

  export type PortalProjectOrderByWithAggregationInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PortalProjectCountOrderByAggregateInput
    _max?: PortalProjectMaxOrderByAggregateInput
    _min?: PortalProjectMinOrderByAggregateInput
  }

  export type PortalProjectScalarWhereWithAggregatesInput = {
    AND?: PortalProjectScalarWhereWithAggregatesInput | PortalProjectScalarWhereWithAggregatesInput[]
    OR?: PortalProjectScalarWhereWithAggregatesInput[]
    NOT?: PortalProjectScalarWhereWithAggregatesInput | PortalProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PortalProject"> | string
    clerkUserId?: StringWithAggregatesFilter<"PortalProject"> | string
    name?: StringWithAggregatesFilter<"PortalProject"> | string
    description?: StringNullableWithAggregatesFilter<"PortalProject"> | string | null
    status?: EnumPortalProjectStatusWithAggregatesFilter<"PortalProject"> | $Enums.PortalProjectStatus
    createdAt?: DateTimeWithAggregatesFilter<"PortalProject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PortalProject"> | Date | string
  }

  export type PortalProjectFileWhereInput = {
    AND?: PortalProjectFileWhereInput | PortalProjectFileWhereInput[]
    OR?: PortalProjectFileWhereInput[]
    NOT?: PortalProjectFileWhereInput | PortalProjectFileWhereInput[]
    id?: StringFilter<"PortalProjectFile"> | string
    projectId?: StringFilter<"PortalProjectFile"> | string
    fileName?: StringFilter<"PortalProjectFile"> | string
    r2Key?: StringFilter<"PortalProjectFile"> | string
    size?: IntFilter<"PortalProjectFile"> | number
    mimeType?: StringFilter<"PortalProjectFile"> | string
    uploadedByClerkId?: StringFilter<"PortalProjectFile"> | string
    createdAt?: DateTimeFilter<"PortalProjectFile"> | Date | string
    project?: XOR<PortalProjectScalarRelationFilter, PortalProjectWhereInput>
  }

  export type PortalProjectFileOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    fileName?: SortOrder
    r2Key?: SortOrder
    size?: SortOrder
    mimeType?: SortOrder
    uploadedByClerkId?: SortOrder
    createdAt?: SortOrder
    project?: PortalProjectOrderByWithRelationInput
  }

  export type PortalProjectFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortalProjectFileWhereInput | PortalProjectFileWhereInput[]
    OR?: PortalProjectFileWhereInput[]
    NOT?: PortalProjectFileWhereInput | PortalProjectFileWhereInput[]
    projectId?: StringFilter<"PortalProjectFile"> | string
    fileName?: StringFilter<"PortalProjectFile"> | string
    r2Key?: StringFilter<"PortalProjectFile"> | string
    size?: IntFilter<"PortalProjectFile"> | number
    mimeType?: StringFilter<"PortalProjectFile"> | string
    uploadedByClerkId?: StringFilter<"PortalProjectFile"> | string
    createdAt?: DateTimeFilter<"PortalProjectFile"> | Date | string
    project?: XOR<PortalProjectScalarRelationFilter, PortalProjectWhereInput>
  }, "id">

  export type PortalProjectFileOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    fileName?: SortOrder
    r2Key?: SortOrder
    size?: SortOrder
    mimeType?: SortOrder
    uploadedByClerkId?: SortOrder
    createdAt?: SortOrder
    _count?: PortalProjectFileCountOrderByAggregateInput
    _avg?: PortalProjectFileAvgOrderByAggregateInput
    _max?: PortalProjectFileMaxOrderByAggregateInput
    _min?: PortalProjectFileMinOrderByAggregateInput
    _sum?: PortalProjectFileSumOrderByAggregateInput
  }

  export type PortalProjectFileScalarWhereWithAggregatesInput = {
    AND?: PortalProjectFileScalarWhereWithAggregatesInput | PortalProjectFileScalarWhereWithAggregatesInput[]
    OR?: PortalProjectFileScalarWhereWithAggregatesInput[]
    NOT?: PortalProjectFileScalarWhereWithAggregatesInput | PortalProjectFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PortalProjectFile"> | string
    projectId?: StringWithAggregatesFilter<"PortalProjectFile"> | string
    fileName?: StringWithAggregatesFilter<"PortalProjectFile"> | string
    r2Key?: StringWithAggregatesFilter<"PortalProjectFile"> | string
    size?: IntWithAggregatesFilter<"PortalProjectFile"> | number
    mimeType?: StringWithAggregatesFilter<"PortalProjectFile"> | string
    uploadedByClerkId?: StringWithAggregatesFilter<"PortalProjectFile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PortalProjectFile"> | Date | string
  }

  export type AdminUserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.AdminRole
    active?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.AdminRole
    active?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    active?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    active?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role?: $Enums.AdminRole
    active?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    active?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumAdminRoleFieldUpdateOperationsInput | $Enums.AdminRole
    active?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAuditLogCreateInput = {
    id?: string
    adminId?: string | null
    action: string
    entity?: string | null
    entityId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipHash?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AdminAuditLogUncheckedCreateInput = {
    id?: string
    adminId?: string | null
    action: string
    entity?: string | null
    entityId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipHash?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AdminAuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAuditLogCreateManyInput = {
    id?: string
    adminId?: string | null
    action: string
    entity?: string | null
    entityId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipHash?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AdminAuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStudyCreateInput = {
    id?: string
    slug: string
    status?: $Enums.CaseStudyStatus
    featured?: boolean
    publishedAt?: Date | string | null
    kicker: string
    title: string
    description: string
    role: string
    timeline: string
    overview: string
    challengeIntro: string
    challengePoints: JsonNullValueInput | InputJsonValue
    approach: JsonNullValueInput | InputJsonValue
    solution: string
    results: string
    gallery: JsonNullValueInput | InputJsonValue
    stats: JsonNullValueInput | InputJsonValue
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseStudyUncheckedCreateInput = {
    id?: string
    slug: string
    status?: $Enums.CaseStudyStatus
    featured?: boolean
    publishedAt?: Date | string | null
    kicker: string
    title: string
    description: string
    role: string
    timeline: string
    overview: string
    challengeIntro: string
    challengePoints: JsonNullValueInput | InputJsonValue
    approach: JsonNullValueInput | InputJsonValue
    solution: string
    results: string
    gallery: JsonNullValueInput | InputJsonValue
    stats: JsonNullValueInput | InputJsonValue
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseStudyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStudyStatusFieldUpdateOperationsInput | $Enums.CaseStudyStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kicker?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    timeline?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    challengeIntro?: StringFieldUpdateOperationsInput | string
    challengePoints?: JsonNullValueInput | InputJsonValue
    approach?: JsonNullValueInput | InputJsonValue
    solution?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    gallery?: JsonNullValueInput | InputJsonValue
    stats?: JsonNullValueInput | InputJsonValue
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStudyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStudyStatusFieldUpdateOperationsInput | $Enums.CaseStudyStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kicker?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    timeline?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    challengeIntro?: StringFieldUpdateOperationsInput | string
    challengePoints?: JsonNullValueInput | InputJsonValue
    approach?: JsonNullValueInput | InputJsonValue
    solution?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    gallery?: JsonNullValueInput | InputJsonValue
    stats?: JsonNullValueInput | InputJsonValue
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStudyCreateManyInput = {
    id?: string
    slug: string
    status?: $Enums.CaseStudyStatus
    featured?: boolean
    publishedAt?: Date | string | null
    kicker: string
    title: string
    description: string
    role: string
    timeline: string
    overview: string
    challengeIntro: string
    challengePoints: JsonNullValueInput | InputJsonValue
    approach: JsonNullValueInput | InputJsonValue
    solution: string
    results: string
    gallery: JsonNullValueInput | InputJsonValue
    stats: JsonNullValueInput | InputJsonValue
    metaTitle?: string | null
    metaDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseStudyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStudyStatusFieldUpdateOperationsInput | $Enums.CaseStudyStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kicker?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    timeline?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    challengeIntro?: StringFieldUpdateOperationsInput | string
    challengePoints?: JsonNullValueInput | InputJsonValue
    approach?: JsonNullValueInput | InputJsonValue
    solution?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    gallery?: JsonNullValueInput | InputJsonValue
    stats?: JsonNullValueInput | InputJsonValue
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStudyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumCaseStudyStatusFieldUpdateOperationsInput | $Enums.CaseStudyStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kicker?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    timeline?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    challengeIntro?: StringFieldUpdateOperationsInput | string
    challengePoints?: JsonNullValueInput | InputJsonValue
    approach?: JsonNullValueInput | InputJsonValue
    solution?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    gallery?: JsonNullValueInput | InputJsonValue
    stats?: JsonNullValueInput | InputJsonValue
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactSubmissionCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    selectedPlan?: string | null
    message: string
    gdprAccepted?: boolean
    status?: $Enums.ContactStatus
    contractSigned?: boolean
    sourcePage?: string | null
    userAgent?: string | null
    ipAddress?: string | null
    sessionId?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmContent?: string | null
    utmTerm?: string | null
    consentAnalytics?: boolean
    emailSent?: boolean
    emailError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactSubmissionUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    selectedPlan?: string | null
    message: string
    gdprAccepted?: boolean
    status?: $Enums.ContactStatus
    contractSigned?: boolean
    sourcePage?: string | null
    userAgent?: string | null
    ipAddress?: string | null
    sessionId?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmContent?: string | null
    utmTerm?: string | null
    consentAnalytics?: boolean
    emailSent?: boolean
    emailError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPlan?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    gdprAccepted?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumContactStatusFieldUpdateOperationsInput | $Enums.ContactStatus
    contractSigned?: BoolFieldUpdateOperationsInput | boolean
    sourcePage?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPlan?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    gdprAccepted?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumContactStatusFieldUpdateOperationsInput | $Enums.ContactStatus
    contractSigned?: BoolFieldUpdateOperationsInput | boolean
    sourcePage?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactSubmissionCreateManyInput = {
    id?: string
    name: string
    email: string
    phone?: string | null
    selectedPlan?: string | null
    message: string
    gdprAccepted?: boolean
    status?: $Enums.ContactStatus
    contractSigned?: boolean
    sourcePage?: string | null
    userAgent?: string | null
    ipAddress?: string | null
    sessionId?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmContent?: string | null
    utmTerm?: string | null
    consentAnalytics?: boolean
    emailSent?: boolean
    emailError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPlan?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    gdprAccepted?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumContactStatusFieldUpdateOperationsInput | $Enums.ContactStatus
    contractSigned?: BoolFieldUpdateOperationsInput | boolean
    sourcePage?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPlan?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    gdprAccepted?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumContactStatusFieldUpdateOperationsInput | $Enums.ContactStatus
    contractSigned?: BoolFieldUpdateOperationsInput | boolean
    sourcePage?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    emailError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsSessionCreateInput = {
    id?: string
    sessionId: string
    consentAnalytics?: boolean
    firstPath?: string | null
    lastPath?: string | null
    referrer?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmContent?: string | null
    utmTerm?: string | null
    deviceType?: string | null
    browser?: string | null
    ipHash?: string | null
    userAgentHash?: string | null
    startedAt?: Date | string
    lastSeenAt?: Date | string
    convertedAt?: Date | string | null
    events?: AnalyticsEventCreateNestedManyWithoutSessionInput
  }

  export type AnalyticsSessionUncheckedCreateInput = {
    id?: string
    sessionId: string
    consentAnalytics?: boolean
    firstPath?: string | null
    lastPath?: string | null
    referrer?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmContent?: string | null
    utmTerm?: string | null
    deviceType?: string | null
    browser?: string | null
    ipHash?: string | null
    userAgentHash?: string | null
    startedAt?: Date | string
    lastSeenAt?: Date | string
    convertedAt?: Date | string | null
    events?: AnalyticsEventUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AnalyticsSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    firstPath?: NullableStringFieldUpdateOperationsInput | string | null
    lastPath?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgentHash?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: AnalyticsEventUpdateManyWithoutSessionNestedInput
  }

  export type AnalyticsSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    firstPath?: NullableStringFieldUpdateOperationsInput | string | null
    lastPath?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgentHash?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: AnalyticsEventUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AnalyticsSessionCreateManyInput = {
    id?: string
    sessionId: string
    consentAnalytics?: boolean
    firstPath?: string | null
    lastPath?: string | null
    referrer?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmContent?: string | null
    utmTerm?: string | null
    deviceType?: string | null
    browser?: string | null
    ipHash?: string | null
    userAgentHash?: string | null
    startedAt?: Date | string
    lastSeenAt?: Date | string
    convertedAt?: Date | string | null
  }

  export type AnalyticsSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    firstPath?: NullableStringFieldUpdateOperationsInput | string | null
    lastPath?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgentHash?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalyticsSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    firstPath?: NullableStringFieldUpdateOperationsInput | string | null
    lastPath?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgentHash?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalyticsEventCreateInput = {
    id?: string
    type: $Enums.AnalyticsEventType
    path?: string | null
    label?: string | null
    value?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    session: AnalyticsSessionCreateNestedOneWithoutEventsInput
  }

  export type AnalyticsEventUncheckedCreateInput = {
    id?: string
    sessionId: string
    type: $Enums.AnalyticsEventType
    path?: string | null
    label?: string | null
    value?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnalyticsEventTypeFieldUpdateOperationsInput | $Enums.AnalyticsEventType
    path?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: AnalyticsSessionUpdateOneRequiredWithoutEventsNestedInput
  }

  export type AnalyticsEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    type?: EnumAnalyticsEventTypeFieldUpdateOperationsInput | $Enums.AnalyticsEventType
    path?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateManyInput = {
    id?: string
    sessionId: string
    type: $Enums.AnalyticsEventType
    path?: string | null
    label?: string | null
    value?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnalyticsEventTypeFieldUpdateOperationsInput | $Enums.AnalyticsEventType
    path?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    type?: EnumAnalyticsEventTypeFieldUpdateOperationsInput | $Enums.AnalyticsEventType
    path?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioProjectCreateInput = {
    id?: string
    title: string
    slug: string
    category?: string | null
    description: string
    image?: string | null
    url?: string | null
    featured?: boolean
    order?: number
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioProjectUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    category?: string | null
    description: string
    image?: string | null
    url?: string | null
    featured?: boolean
    order?: number
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioProjectCreateManyInput = {
    id?: string
    title: string
    slug: string
    category?: string | null
    description: string
    image?: string | null
    url?: string | null
    featured?: boolean
    order?: number
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteTextCreateInput = {
    id?: string
    key: string
    value: string
    group?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteTextUncheckedCreateInput = {
    id?: string
    key: string
    value: string
    group?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteTextUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    group?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteTextUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    group?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteTextCreateManyInput = {
    id?: string
    key: string
    value: string
    group?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteTextUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    group?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteTextUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    group?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanySettingCreateInput = {
    id?: string
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanySettingUncheckedCreateInput = {
    id?: string
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanySettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanySettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanySettingCreateManyInput = {
    id?: string
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanySettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanySettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaAssetCreateInput = {
    id?: string
    url: string
    alt?: string | null
    type?: string | null
    createdAt?: Date | string
  }

  export type MediaAssetUncheckedCreateInput = {
    id?: string
    url: string
    alt?: string | null
    type?: string | null
    createdAt?: Date | string
  }

  export type MediaAssetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaAssetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaAssetCreateManyInput = {
    id?: string
    url: string
    alt?: string | null
    type?: string | null
    createdAt?: Date | string
  }

  export type MediaAssetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaAssetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalProjectCreateInput = {
    id?: string
    clerkUserId: string
    name: string
    description?: string | null
    status?: $Enums.PortalProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    files?: PortalProjectFileCreateNestedManyWithoutProjectInput
  }

  export type PortalProjectUncheckedCreateInput = {
    id?: string
    clerkUserId: string
    name: string
    description?: string | null
    status?: $Enums.PortalProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    files?: PortalProjectFileUncheckedCreateNestedManyWithoutProjectInput
  }

  export type PortalProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPortalProjectStatusFieldUpdateOperationsInput | $Enums.PortalProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: PortalProjectFileUpdateManyWithoutProjectNestedInput
  }

  export type PortalProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPortalProjectStatusFieldUpdateOperationsInput | $Enums.PortalProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: PortalProjectFileUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type PortalProjectCreateManyInput = {
    id?: string
    clerkUserId: string
    name: string
    description?: string | null
    status?: $Enums.PortalProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortalProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPortalProjectStatusFieldUpdateOperationsInput | $Enums.PortalProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPortalProjectStatusFieldUpdateOperationsInput | $Enums.PortalProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalProjectFileCreateInput = {
    id?: string
    fileName: string
    r2Key: string
    size: number
    mimeType: string
    uploadedByClerkId: string
    createdAt?: Date | string
    project: PortalProjectCreateNestedOneWithoutFilesInput
  }

  export type PortalProjectFileUncheckedCreateInput = {
    id?: string
    projectId: string
    fileName: string
    r2Key: string
    size: number
    mimeType: string
    uploadedByClerkId: string
    createdAt?: Date | string
  }

  export type PortalProjectFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadedByClerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: PortalProjectUpdateOneRequiredWithoutFilesNestedInput
  }

  export type PortalProjectFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadedByClerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalProjectFileCreateManyInput = {
    id?: string
    projectId: string
    fileName: string
    r2Key: string
    size: number
    mimeType: string
    uploadedByClerkId: string
    createdAt?: Date | string
  }

  export type PortalProjectFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadedByClerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalProjectFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadedByClerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdminUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AdminAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumCaseStudyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStudyStatus | EnumCaseStudyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStudyStatus[] | ListEnumCaseStudyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStudyStatus[] | ListEnumCaseStudyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStudyStatusFilter<$PrismaModel> | $Enums.CaseStudyStatus
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CaseStudyCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    publishedAt?: SortOrder
    kicker?: SortOrder
    title?: SortOrder
    description?: SortOrder
    role?: SortOrder
    timeline?: SortOrder
    overview?: SortOrder
    challengeIntro?: SortOrder
    challengePoints?: SortOrder
    approach?: SortOrder
    solution?: SortOrder
    results?: SortOrder
    gallery?: SortOrder
    stats?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseStudyMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    publishedAt?: SortOrder
    kicker?: SortOrder
    title?: SortOrder
    description?: SortOrder
    role?: SortOrder
    timeline?: SortOrder
    overview?: SortOrder
    challengeIntro?: SortOrder
    solution?: SortOrder
    results?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseStudyMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    publishedAt?: SortOrder
    kicker?: SortOrder
    title?: SortOrder
    description?: SortOrder
    role?: SortOrder
    timeline?: SortOrder
    overview?: SortOrder
    challengeIntro?: SortOrder
    solution?: SortOrder
    results?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCaseStudyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStudyStatus | EnumCaseStudyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStudyStatus[] | ListEnumCaseStudyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStudyStatus[] | ListEnumCaseStudyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStudyStatusWithAggregatesFilter<$PrismaModel> | $Enums.CaseStudyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseStudyStatusFilter<$PrismaModel>
    _max?: NestedEnumCaseStudyStatusFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumContactStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContactStatus | EnumContactStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContactStatus[] | ListEnumContactStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContactStatus[] | ListEnumContactStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContactStatusFilter<$PrismaModel> | $Enums.ContactStatus
  }

  export type ContactSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    selectedPlan?: SortOrder
    message?: SortOrder
    gdprAccepted?: SortOrder
    status?: SortOrder
    contractSigned?: SortOrder
    sourcePage?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    sessionId?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    utmContent?: SortOrder
    utmTerm?: SortOrder
    consentAnalytics?: SortOrder
    emailSent?: SortOrder
    emailError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    selectedPlan?: SortOrder
    message?: SortOrder
    gdprAccepted?: SortOrder
    status?: SortOrder
    contractSigned?: SortOrder
    sourcePage?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    sessionId?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    utmContent?: SortOrder
    utmTerm?: SortOrder
    consentAnalytics?: SortOrder
    emailSent?: SortOrder
    emailError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    selectedPlan?: SortOrder
    message?: SortOrder
    gdprAccepted?: SortOrder
    status?: SortOrder
    contractSigned?: SortOrder
    sourcePage?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    sessionId?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    utmContent?: SortOrder
    utmTerm?: SortOrder
    consentAnalytics?: SortOrder
    emailSent?: SortOrder
    emailError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumContactStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContactStatus | EnumContactStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContactStatus[] | ListEnumContactStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContactStatus[] | ListEnumContactStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContactStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContactStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContactStatusFilter<$PrismaModel>
    _max?: NestedEnumContactStatusFilter<$PrismaModel>
  }

  export type AnalyticsEventListRelationFilter = {
    every?: AnalyticsEventWhereInput
    some?: AnalyticsEventWhereInput
    none?: AnalyticsEventWhereInput
  }

  export type AnalyticsEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalyticsSessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    consentAnalytics?: SortOrder
    firstPath?: SortOrder
    lastPath?: SortOrder
    referrer?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    utmContent?: SortOrder
    utmTerm?: SortOrder
    deviceType?: SortOrder
    browser?: SortOrder
    ipHash?: SortOrder
    userAgentHash?: SortOrder
    startedAt?: SortOrder
    lastSeenAt?: SortOrder
    convertedAt?: SortOrder
  }

  export type AnalyticsSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    consentAnalytics?: SortOrder
    firstPath?: SortOrder
    lastPath?: SortOrder
    referrer?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    utmContent?: SortOrder
    utmTerm?: SortOrder
    deviceType?: SortOrder
    browser?: SortOrder
    ipHash?: SortOrder
    userAgentHash?: SortOrder
    startedAt?: SortOrder
    lastSeenAt?: SortOrder
    convertedAt?: SortOrder
  }

  export type AnalyticsSessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    consentAnalytics?: SortOrder
    firstPath?: SortOrder
    lastPath?: SortOrder
    referrer?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    utmContent?: SortOrder
    utmTerm?: SortOrder
    deviceType?: SortOrder
    browser?: SortOrder
    ipHash?: SortOrder
    userAgentHash?: SortOrder
    startedAt?: SortOrder
    lastSeenAt?: SortOrder
    convertedAt?: SortOrder
  }

  export type EnumAnalyticsEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalyticsEventType | EnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnalyticsEventType[] | ListEnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalyticsEventType[] | ListEnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalyticsEventTypeFilter<$PrismaModel> | $Enums.AnalyticsEventType
  }

  export type AnalyticsSessionScalarRelationFilter = {
    is?: AnalyticsSessionWhereInput
    isNot?: AnalyticsSessionWhereInput
  }

  export type AnalyticsEventCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    path?: SortOrder
    label?: SortOrder
    value?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsEventMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    path?: SortOrder
    label?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsEventMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    type?: SortOrder
    path?: SortOrder
    label?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAnalyticsEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalyticsEventType | EnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnalyticsEventType[] | ListEnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalyticsEventType[] | ListEnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalyticsEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnalyticsEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnalyticsEventTypeFilter<$PrismaModel>
    _max?: NestedEnumAnalyticsEventTypeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PortfolioProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    description?: SortOrder
    image?: SortOrder
    url?: SortOrder
    featured?: SortOrder
    order?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioProjectAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PortfolioProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    description?: SortOrder
    image?: SortOrder
    url?: SortOrder
    featured?: SortOrder
    order?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    description?: SortOrder
    image?: SortOrder
    url?: SortOrder
    featured?: SortOrder
    order?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortfolioProjectSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SiteTextCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteTextMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteTextMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    group?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaAssetCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaAssetMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type MediaAssetMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumPortalProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PortalProjectStatus | EnumPortalProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PortalProjectStatus[] | ListEnumPortalProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PortalProjectStatus[] | ListEnumPortalProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPortalProjectStatusFilter<$PrismaModel> | $Enums.PortalProjectStatus
  }

  export type PortalProjectFileListRelationFilter = {
    every?: PortalProjectFileWhereInput
    some?: PortalProjectFileWhereInput
    none?: PortalProjectFileWhereInput
  }

  export type PortalProjectFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortalProjectCountOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortalProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PortalProjectMinOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPortalProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortalProjectStatus | EnumPortalProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PortalProjectStatus[] | ListEnumPortalProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PortalProjectStatus[] | ListEnumPortalProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPortalProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.PortalProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPortalProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumPortalProjectStatusFilter<$PrismaModel>
  }

  export type PortalProjectScalarRelationFilter = {
    is?: PortalProjectWhereInput
    isNot?: PortalProjectWhereInput
  }

  export type PortalProjectFileCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fileName?: SortOrder
    r2Key?: SortOrder
    size?: SortOrder
    mimeType?: SortOrder
    uploadedByClerkId?: SortOrder
    createdAt?: SortOrder
  }

  export type PortalProjectFileAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type PortalProjectFileMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fileName?: SortOrder
    r2Key?: SortOrder
    size?: SortOrder
    mimeType?: SortOrder
    uploadedByClerkId?: SortOrder
    createdAt?: SortOrder
  }

  export type PortalProjectFileMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    fileName?: SortOrder
    r2Key?: SortOrder
    size?: SortOrder
    mimeType?: SortOrder
    uploadedByClerkId?: SortOrder
    createdAt?: SortOrder
  }

  export type PortalProjectFileSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAdminRoleFieldUpdateOperationsInput = {
    set?: $Enums.AdminRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumCaseStudyStatusFieldUpdateOperationsInput = {
    set?: $Enums.CaseStudyStatus
  }

  export type EnumContactStatusFieldUpdateOperationsInput = {
    set?: $Enums.ContactStatus
  }

  export type AnalyticsEventCreateNestedManyWithoutSessionInput = {
    create?: XOR<AnalyticsEventCreateWithoutSessionInput, AnalyticsEventUncheckedCreateWithoutSessionInput> | AnalyticsEventCreateWithoutSessionInput[] | AnalyticsEventUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutSessionInput | AnalyticsEventCreateOrConnectWithoutSessionInput[]
    createMany?: AnalyticsEventCreateManySessionInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
  }

  export type AnalyticsEventUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<AnalyticsEventCreateWithoutSessionInput, AnalyticsEventUncheckedCreateWithoutSessionInput> | AnalyticsEventCreateWithoutSessionInput[] | AnalyticsEventUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutSessionInput | AnalyticsEventCreateOrConnectWithoutSessionInput[]
    createMany?: AnalyticsEventCreateManySessionInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
  }

  export type AnalyticsEventUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutSessionInput, AnalyticsEventUncheckedCreateWithoutSessionInput> | AnalyticsEventCreateWithoutSessionInput[] | AnalyticsEventUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutSessionInput | AnalyticsEventCreateOrConnectWithoutSessionInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutSessionInput | AnalyticsEventUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AnalyticsEventCreateManySessionInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutSessionInput | AnalyticsEventUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutSessionInput | AnalyticsEventUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
  }

  export type AnalyticsEventUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutSessionInput, AnalyticsEventUncheckedCreateWithoutSessionInput> | AnalyticsEventCreateWithoutSessionInput[] | AnalyticsEventUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutSessionInput | AnalyticsEventCreateOrConnectWithoutSessionInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutSessionInput | AnalyticsEventUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AnalyticsEventCreateManySessionInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutSessionInput | AnalyticsEventUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutSessionInput | AnalyticsEventUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
  }

  export type AnalyticsSessionCreateNestedOneWithoutEventsInput = {
    create?: XOR<AnalyticsSessionCreateWithoutEventsInput, AnalyticsSessionUncheckedCreateWithoutEventsInput>
    connectOrCreate?: AnalyticsSessionCreateOrConnectWithoutEventsInput
    connect?: AnalyticsSessionWhereUniqueInput
  }

  export type EnumAnalyticsEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.AnalyticsEventType
  }

  export type AnalyticsSessionUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<AnalyticsSessionCreateWithoutEventsInput, AnalyticsSessionUncheckedCreateWithoutEventsInput>
    connectOrCreate?: AnalyticsSessionCreateOrConnectWithoutEventsInput
    upsert?: AnalyticsSessionUpsertWithoutEventsInput
    connect?: AnalyticsSessionWhereUniqueInput
    update?: XOR<XOR<AnalyticsSessionUpdateToOneWithWhereWithoutEventsInput, AnalyticsSessionUpdateWithoutEventsInput>, AnalyticsSessionUncheckedUpdateWithoutEventsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PortalProjectFileCreateNestedManyWithoutProjectInput = {
    create?: XOR<PortalProjectFileCreateWithoutProjectInput, PortalProjectFileUncheckedCreateWithoutProjectInput> | PortalProjectFileCreateWithoutProjectInput[] | PortalProjectFileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PortalProjectFileCreateOrConnectWithoutProjectInput | PortalProjectFileCreateOrConnectWithoutProjectInput[]
    createMany?: PortalProjectFileCreateManyProjectInputEnvelope
    connect?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
  }

  export type PortalProjectFileUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<PortalProjectFileCreateWithoutProjectInput, PortalProjectFileUncheckedCreateWithoutProjectInput> | PortalProjectFileCreateWithoutProjectInput[] | PortalProjectFileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PortalProjectFileCreateOrConnectWithoutProjectInput | PortalProjectFileCreateOrConnectWithoutProjectInput[]
    createMany?: PortalProjectFileCreateManyProjectInputEnvelope
    connect?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
  }

  export type EnumPortalProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.PortalProjectStatus
  }

  export type PortalProjectFileUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PortalProjectFileCreateWithoutProjectInput, PortalProjectFileUncheckedCreateWithoutProjectInput> | PortalProjectFileCreateWithoutProjectInput[] | PortalProjectFileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PortalProjectFileCreateOrConnectWithoutProjectInput | PortalProjectFileCreateOrConnectWithoutProjectInput[]
    upsert?: PortalProjectFileUpsertWithWhereUniqueWithoutProjectInput | PortalProjectFileUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PortalProjectFileCreateManyProjectInputEnvelope
    set?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
    disconnect?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
    delete?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
    connect?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
    update?: PortalProjectFileUpdateWithWhereUniqueWithoutProjectInput | PortalProjectFileUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PortalProjectFileUpdateManyWithWhereWithoutProjectInput | PortalProjectFileUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PortalProjectFileScalarWhereInput | PortalProjectFileScalarWhereInput[]
  }

  export type PortalProjectFileUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PortalProjectFileCreateWithoutProjectInput, PortalProjectFileUncheckedCreateWithoutProjectInput> | PortalProjectFileCreateWithoutProjectInput[] | PortalProjectFileUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PortalProjectFileCreateOrConnectWithoutProjectInput | PortalProjectFileCreateOrConnectWithoutProjectInput[]
    upsert?: PortalProjectFileUpsertWithWhereUniqueWithoutProjectInput | PortalProjectFileUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PortalProjectFileCreateManyProjectInputEnvelope
    set?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
    disconnect?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
    delete?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
    connect?: PortalProjectFileWhereUniqueInput | PortalProjectFileWhereUniqueInput[]
    update?: PortalProjectFileUpdateWithWhereUniqueWithoutProjectInput | PortalProjectFileUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PortalProjectFileUpdateManyWithWhereWithoutProjectInput | PortalProjectFileUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PortalProjectFileScalarWhereInput | PortalProjectFileScalarWhereInput[]
  }

  export type PortalProjectCreateNestedOneWithoutFilesInput = {
    create?: XOR<PortalProjectCreateWithoutFilesInput, PortalProjectUncheckedCreateWithoutFilesInput>
    connectOrCreate?: PortalProjectCreateOrConnectWithoutFilesInput
    connect?: PortalProjectWhereUniqueInput
  }

  export type PortalProjectUpdateOneRequiredWithoutFilesNestedInput = {
    create?: XOR<PortalProjectCreateWithoutFilesInput, PortalProjectUncheckedCreateWithoutFilesInput>
    connectOrCreate?: PortalProjectCreateOrConnectWithoutFilesInput
    upsert?: PortalProjectUpsertWithoutFilesInput
    connect?: PortalProjectWhereUniqueInput
    update?: XOR<XOR<PortalProjectUpdateToOneWithWhereWithoutFilesInput, PortalProjectUpdateWithoutFilesInput>, PortalProjectUncheckedUpdateWithoutFilesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumAdminRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleFilter<$PrismaModel> | $Enums.AdminRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdminRole | EnumAdminRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdminRole[] | ListEnumAdminRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAdminRoleWithAggregatesFilter<$PrismaModel> | $Enums.AdminRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdminRoleFilter<$PrismaModel>
    _max?: NestedEnumAdminRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumCaseStudyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStudyStatus | EnumCaseStudyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStudyStatus[] | ListEnumCaseStudyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStudyStatus[] | ListEnumCaseStudyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStudyStatusFilter<$PrismaModel> | $Enums.CaseStudyStatus
  }

  export type NestedEnumCaseStudyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStudyStatus | EnumCaseStudyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStudyStatus[] | ListEnumCaseStudyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStudyStatus[] | ListEnumCaseStudyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStudyStatusWithAggregatesFilter<$PrismaModel> | $Enums.CaseStudyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseStudyStatusFilter<$PrismaModel>
    _max?: NestedEnumCaseStudyStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumContactStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContactStatus | EnumContactStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContactStatus[] | ListEnumContactStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContactStatus[] | ListEnumContactStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContactStatusFilter<$PrismaModel> | $Enums.ContactStatus
  }

  export type NestedEnumContactStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContactStatus | EnumContactStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContactStatus[] | ListEnumContactStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContactStatus[] | ListEnumContactStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContactStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContactStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContactStatusFilter<$PrismaModel>
    _max?: NestedEnumContactStatusFilter<$PrismaModel>
  }

  export type NestedEnumAnalyticsEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalyticsEventType | EnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnalyticsEventType[] | ListEnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalyticsEventType[] | ListEnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalyticsEventTypeFilter<$PrismaModel> | $Enums.AnalyticsEventType
  }

  export type NestedEnumAnalyticsEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnalyticsEventType | EnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnalyticsEventType[] | ListEnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnalyticsEventType[] | ListEnumAnalyticsEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnalyticsEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnalyticsEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnalyticsEventTypeFilter<$PrismaModel>
    _max?: NestedEnumAnalyticsEventTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPortalProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PortalProjectStatus | EnumPortalProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PortalProjectStatus[] | ListEnumPortalProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PortalProjectStatus[] | ListEnumPortalProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPortalProjectStatusFilter<$PrismaModel> | $Enums.PortalProjectStatus
  }

  export type NestedEnumPortalProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortalProjectStatus | EnumPortalProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PortalProjectStatus[] | ListEnumPortalProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PortalProjectStatus[] | ListEnumPortalProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPortalProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.PortalProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPortalProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumPortalProjectStatusFilter<$PrismaModel>
  }

  export type AnalyticsEventCreateWithoutSessionInput = {
    id?: string
    type: $Enums.AnalyticsEventType
    path?: string | null
    label?: string | null
    value?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventUncheckedCreateWithoutSessionInput = {
    id?: string
    type: $Enums.AnalyticsEventType
    path?: string | null
    label?: string | null
    value?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventCreateOrConnectWithoutSessionInput = {
    where: AnalyticsEventWhereUniqueInput
    create: XOR<AnalyticsEventCreateWithoutSessionInput, AnalyticsEventUncheckedCreateWithoutSessionInput>
  }

  export type AnalyticsEventCreateManySessionInputEnvelope = {
    data: AnalyticsEventCreateManySessionInput | AnalyticsEventCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type AnalyticsEventUpsertWithWhereUniqueWithoutSessionInput = {
    where: AnalyticsEventWhereUniqueInput
    update: XOR<AnalyticsEventUpdateWithoutSessionInput, AnalyticsEventUncheckedUpdateWithoutSessionInput>
    create: XOR<AnalyticsEventCreateWithoutSessionInput, AnalyticsEventUncheckedCreateWithoutSessionInput>
  }

  export type AnalyticsEventUpdateWithWhereUniqueWithoutSessionInput = {
    where: AnalyticsEventWhereUniqueInput
    data: XOR<AnalyticsEventUpdateWithoutSessionInput, AnalyticsEventUncheckedUpdateWithoutSessionInput>
  }

  export type AnalyticsEventUpdateManyWithWhereWithoutSessionInput = {
    where: AnalyticsEventScalarWhereInput
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyWithoutSessionInput>
  }

  export type AnalyticsEventScalarWhereInput = {
    AND?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
    OR?: AnalyticsEventScalarWhereInput[]
    NOT?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
    id?: StringFilter<"AnalyticsEvent"> | string
    sessionId?: StringFilter<"AnalyticsEvent"> | string
    type?: EnumAnalyticsEventTypeFilter<"AnalyticsEvent"> | $Enums.AnalyticsEventType
    path?: StringNullableFilter<"AnalyticsEvent"> | string | null
    label?: StringNullableFilter<"AnalyticsEvent"> | string | null
    value?: StringNullableFilter<"AnalyticsEvent"> | string | null
    metadata?: JsonNullableFilter<"AnalyticsEvent">
    createdAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
  }

  export type AnalyticsSessionCreateWithoutEventsInput = {
    id?: string
    sessionId: string
    consentAnalytics?: boolean
    firstPath?: string | null
    lastPath?: string | null
    referrer?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmContent?: string | null
    utmTerm?: string | null
    deviceType?: string | null
    browser?: string | null
    ipHash?: string | null
    userAgentHash?: string | null
    startedAt?: Date | string
    lastSeenAt?: Date | string
    convertedAt?: Date | string | null
  }

  export type AnalyticsSessionUncheckedCreateWithoutEventsInput = {
    id?: string
    sessionId: string
    consentAnalytics?: boolean
    firstPath?: string | null
    lastPath?: string | null
    referrer?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmContent?: string | null
    utmTerm?: string | null
    deviceType?: string | null
    browser?: string | null
    ipHash?: string | null
    userAgentHash?: string | null
    startedAt?: Date | string
    lastSeenAt?: Date | string
    convertedAt?: Date | string | null
  }

  export type AnalyticsSessionCreateOrConnectWithoutEventsInput = {
    where: AnalyticsSessionWhereUniqueInput
    create: XOR<AnalyticsSessionCreateWithoutEventsInput, AnalyticsSessionUncheckedCreateWithoutEventsInput>
  }

  export type AnalyticsSessionUpsertWithoutEventsInput = {
    update: XOR<AnalyticsSessionUpdateWithoutEventsInput, AnalyticsSessionUncheckedUpdateWithoutEventsInput>
    create: XOR<AnalyticsSessionCreateWithoutEventsInput, AnalyticsSessionUncheckedCreateWithoutEventsInput>
    where?: AnalyticsSessionWhereInput
  }

  export type AnalyticsSessionUpdateToOneWithWhereWithoutEventsInput = {
    where?: AnalyticsSessionWhereInput
    data: XOR<AnalyticsSessionUpdateWithoutEventsInput, AnalyticsSessionUncheckedUpdateWithoutEventsInput>
  }

  export type AnalyticsSessionUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    firstPath?: NullableStringFieldUpdateOperationsInput | string | null
    lastPath?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgentHash?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalyticsSessionUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    firstPath?: NullableStringFieldUpdateOperationsInput | string | null
    lastPath?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgentHash?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PortalProjectFileCreateWithoutProjectInput = {
    id?: string
    fileName: string
    r2Key: string
    size: number
    mimeType: string
    uploadedByClerkId: string
    createdAt?: Date | string
  }

  export type PortalProjectFileUncheckedCreateWithoutProjectInput = {
    id?: string
    fileName: string
    r2Key: string
    size: number
    mimeType: string
    uploadedByClerkId: string
    createdAt?: Date | string
  }

  export type PortalProjectFileCreateOrConnectWithoutProjectInput = {
    where: PortalProjectFileWhereUniqueInput
    create: XOR<PortalProjectFileCreateWithoutProjectInput, PortalProjectFileUncheckedCreateWithoutProjectInput>
  }

  export type PortalProjectFileCreateManyProjectInputEnvelope = {
    data: PortalProjectFileCreateManyProjectInput | PortalProjectFileCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type PortalProjectFileUpsertWithWhereUniqueWithoutProjectInput = {
    where: PortalProjectFileWhereUniqueInput
    update: XOR<PortalProjectFileUpdateWithoutProjectInput, PortalProjectFileUncheckedUpdateWithoutProjectInput>
    create: XOR<PortalProjectFileCreateWithoutProjectInput, PortalProjectFileUncheckedCreateWithoutProjectInput>
  }

  export type PortalProjectFileUpdateWithWhereUniqueWithoutProjectInput = {
    where: PortalProjectFileWhereUniqueInput
    data: XOR<PortalProjectFileUpdateWithoutProjectInput, PortalProjectFileUncheckedUpdateWithoutProjectInput>
  }

  export type PortalProjectFileUpdateManyWithWhereWithoutProjectInput = {
    where: PortalProjectFileScalarWhereInput
    data: XOR<PortalProjectFileUpdateManyMutationInput, PortalProjectFileUncheckedUpdateManyWithoutProjectInput>
  }

  export type PortalProjectFileScalarWhereInput = {
    AND?: PortalProjectFileScalarWhereInput | PortalProjectFileScalarWhereInput[]
    OR?: PortalProjectFileScalarWhereInput[]
    NOT?: PortalProjectFileScalarWhereInput | PortalProjectFileScalarWhereInput[]
    id?: StringFilter<"PortalProjectFile"> | string
    projectId?: StringFilter<"PortalProjectFile"> | string
    fileName?: StringFilter<"PortalProjectFile"> | string
    r2Key?: StringFilter<"PortalProjectFile"> | string
    size?: IntFilter<"PortalProjectFile"> | number
    mimeType?: StringFilter<"PortalProjectFile"> | string
    uploadedByClerkId?: StringFilter<"PortalProjectFile"> | string
    createdAt?: DateTimeFilter<"PortalProjectFile"> | Date | string
  }

  export type PortalProjectCreateWithoutFilesInput = {
    id?: string
    clerkUserId: string
    name: string
    description?: string | null
    status?: $Enums.PortalProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortalProjectUncheckedCreateWithoutFilesInput = {
    id?: string
    clerkUserId: string
    name: string
    description?: string | null
    status?: $Enums.PortalProjectStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortalProjectCreateOrConnectWithoutFilesInput = {
    where: PortalProjectWhereUniqueInput
    create: XOR<PortalProjectCreateWithoutFilesInput, PortalProjectUncheckedCreateWithoutFilesInput>
  }

  export type PortalProjectUpsertWithoutFilesInput = {
    update: XOR<PortalProjectUpdateWithoutFilesInput, PortalProjectUncheckedUpdateWithoutFilesInput>
    create: XOR<PortalProjectCreateWithoutFilesInput, PortalProjectUncheckedCreateWithoutFilesInput>
    where?: PortalProjectWhereInput
  }

  export type PortalProjectUpdateToOneWithWhereWithoutFilesInput = {
    where?: PortalProjectWhereInput
    data: XOR<PortalProjectUpdateWithoutFilesInput, PortalProjectUncheckedUpdateWithoutFilesInput>
  }

  export type PortalProjectUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPortalProjectStatusFieldUpdateOperationsInput | $Enums.PortalProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalProjectUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPortalProjectStatusFieldUpdateOperationsInput | $Enums.PortalProjectStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateManySessionInput = {
    id?: string
    type: $Enums.AnalyticsEventType
    path?: string | null
    label?: string | null
    value?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnalyticsEventTypeFieldUpdateOperationsInput | $Enums.AnalyticsEventType
    path?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnalyticsEventTypeFieldUpdateOperationsInput | $Enums.AnalyticsEventType
    path?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAnalyticsEventTypeFieldUpdateOperationsInput | $Enums.AnalyticsEventType
    path?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalProjectFileCreateManyProjectInput = {
    id?: string
    fileName: string
    r2Key: string
    size: number
    mimeType: string
    uploadedByClerkId: string
    createdAt?: Date | string
  }

  export type PortalProjectFileUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadedByClerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalProjectFileUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadedByClerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortalProjectFileUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    uploadedByClerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}