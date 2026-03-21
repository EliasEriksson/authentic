export type Shared<A, B> = {
  [P in keyof A & keyof B]: A[P] extends B[P] ? A[P] : never;
};
