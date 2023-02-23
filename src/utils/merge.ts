export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const prop in rhs) {
    if (!rhs.hasOwnProperty(prop)) {
      continue;
    }

    try {
      if (rhs[prop].constructor === Object) {
        rhs[prop] = merge(lhs[prop] as Indexed, rhs[prop] as Indexed);
      } else {
        lhs[prop] = rhs[prop];
      }
    } catch (e) {
      lhs[prop] = rhs[prop];
    }
  }

  return lhs;
}
