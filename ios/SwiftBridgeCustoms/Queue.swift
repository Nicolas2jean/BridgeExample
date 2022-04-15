import Foundation

struct Queue<T> {
  private var list = [T]()
  private var headIsBeingPeeked = false;

  var isEmpty: Bool { return self.list.isEmpty }

  mutating func peek() -> T? {
    self.headIsBeingPeeked = true;
    return self.list.first
  }

  mutating func append(_ item: T) {
    self.list.append(item)
  }

  mutating func remove() {
    guard self.isEmpty == false else { return ; }
    self.headIsBeingPeeked = false;
    self.list.removeFirst()
  }

  var isBeingPeeked: Bool { return self.headIsBeingPeeked }
}
