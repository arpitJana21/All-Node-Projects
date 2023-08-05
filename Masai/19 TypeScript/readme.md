# S.O.L.I.D

<aside>
<img src="https://www.notion.so/icons/book_red.svg" alt="https://www.notion.so/icons/book_red.svg" width="40px" /> The **S.O.L.I.D** principles are a set of five design principles that are widely used in object-oriented programming to create maintainable, scalable, and robust software. They were introduced by **Robert C. Martin** and are considered fundamental guidelines for writing clean and modular code. Let's go through each of the SOLID principles and see how they can be applied using TypeScript.

**S = Single Responsibility Principle ( SRP )**

**O = Open/Closed Principle [OCP](https://www.notion.so/S-O-L-I-D-a54b65e93c514d26811c6113097d84b7?pvs=21)**

**L = Liskov Substitution Principle [LSP](https://www.notion.so/S-O-L-I-D-a54b65e93c514d26811c6113097d84b7?pvs=21)**

**I = Interface Segregation Principle [ISP](https://www.notion.so/S-O-L-I-D-a54b65e93c514d26811c6113097d84b7?pvs=21)**

**D = Dependency Inversion Principle [DIP](https://www.notion.so/S-O-L-I-D-a54b65e93c514d26811c6113097d84b7?pvs=21)**

</aside>

---

<aside>
<img src="https://www.notion.so/icons/book_red.svg" alt="https://www.notion.so/icons/book_red.svg" width="40px" /> **Single Responsibility Principle (SRP)**
The SRP states that a class should have only one reason to change, i.e., it should have only one responsibility. This principle encourages a clear separation of concerns, making the code easier to understand, maintain, and test.

TypeScript example:

```tsx
// Bad Example: A class with multiple responsibilities
class UserService {
    getUser(id: number) {
        // ... logic to get the user from the database
    }

    saveUser(user: User) {
        // ... logic to save the user to the database
    }

    sendEmail(user: User, message: string) {
        // ... logic to send an email to the user
    }
}
```

In the above example, the `UserService` class has multiple responsibilities: retrieving users, saving users, and sending emails. This violates the SRP.

```tsx
// Good Example: Separate classes for each responsibility
class UserService {
    getUser(id: number) {
        // ... logic to get the user from the database
    }

    saveUser(user: User) {
        // ... logic to save the user to the database
    }
}

class EmailService {
    sendEmail(user: User, message: string) {
        // ... logic to send an email to the user
    }
}
```

</aside>

---

<aside>
<img src="https://www.notion.so/icons/book_red.svg" alt="https://www.notion.so/icons/book_red.svg" width="40px" /> **Open/Closed Principle (OCP)**
The OCP states that software entities (classes, modules, functions) should be open for extension but closed for modification. It means that you should be able to extend the behavior of a module without modifying its source code.

TypeScript example:

```tsx
// Bad Example: Modifying existing code for new functionality
class Report {
    generateReport(type: string) {
        if (type === 'pdf') {
            // ... logic to generate a PDF report
        } else if (type === 'csv') {
            // ... logic to generate a CSV report
        }
    }
}
```

In the above example, if you want to add support for a new report type (e.g., 'json'), you have to modify the existing `Report` class, violating the OCP.

```tsx
// Good Example: Using inheritance to add new functionality
abstract class Report {
    abstract generateReport(): void;
}

class PdfReport extends Report {
    generateReport() {
        // ... logic to generate a PDF report
    }
}

class CsvReport extends Report {
    generateReport() {
        // ... logic to generate a CSV report
    }
}
```

With the good example, you can easily add new report types by creating new classes without modifying the existing code.

</aside>

---

<aside>
<img src="https://www.notion.so/icons/book_red.svg" alt="https://www.notion.so/icons/book_red.svg" width="40px" /> **Liskov Substitution Principle (LSP)**
The LSP states that objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program. In simpler terms, a subclass should behave in a way that does not surprise the client of the superclass.

TypeScript example:

```tsx
// Bad Example: Subclass violating the expected behavior
class Rectangle {
    constructor(protected width: number, protected height: number) {}

    getArea(): number {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(size: number) {
        super(size, size);
    }

    setWidth(width: number) {
        this.width = width;
        this.height = width;
    }
}
```

In the above example, the `Square` class violates the LSP because it changes the behavior of the `Rectangle` class. A square's width and height should always be equal, but by using the `setWidth` method, we violate this constraint.

```tsx
// Good Example: Subclasses maintaining expected behavior
abstract class Shape {
    abstract getArea(): number;
}

class Rectangle extends Shape {
    constructor(protected width: number, protected height: number) {
        super();
    }

    getArea(): number {
        return this.width * this.height;
    }
}

class Square extends Shape {
    constructor(private size: number) {
        super();
    }

    getArea(): number {
        return this.size * this.size;
    }
}
```

In the good example, we've created an abstract `Shape` class, and both `Rectangle` and `Square` classes extend it, maintaining the expected behavior.

</aside>

---

<aside>
<img src="https://www.notion.so/icons/book_red.svg" alt="https://www.notion.so/icons/book_red.svg" width="40px" /> **Interface Segregation Principle (ISP)**
The ISP states that a class should not be forced to implement interfaces it does not use. Instead of having a large, monolithic interface, it is better to have smaller, specific interfaces.

TypeScript example:

```tsx
// Bad Example: A large monolithic interface
interface Workable {
    startWork(): void;
    stopWork(): void;
    reportStatus(): void;
}

class Programmer implements Workable {
    startWork() {
        // ... logic to start programming
    }

    stopWork() {
        // ... logic to stop programming
    }

    reportStatus() {
        // ... logic to report programming status
    }
}

class Manager implements Workable {
    startWork() {
        // ... logic to start managing
    }

    stopWork() {
        // ... logic to stop managing
    }

    reportStatus() {
        // ... logic to report managing status
    }
}
```

In the above example, both `Programmer` and `Manager` classes need to implement methods that are not relevant to them, violating the ISP.

```tsx
// Good Example: Smaller, specific interfaces
interface Workable {
    startWork(): void;
    stopWork(): void;
}

interface Reportable {
    reportStatus(): void;
}

class Programmer implements Workable {
    startWork() {
        // ... logic to start programming
    }

    stopWork() {
        // ... logic to stop programming
    }
}

class Manager implements Workable, Reportable {
    startWork() {
        // ... logic to start managing
    }

    stopWork() {
        // ... logic to stop managing
    }

    reportStatus() {
        // ... logic to report managing status
    }
}
```

In the good example, we've separated the `Workable` and `Reportable` interfaces, allowing classes to implement only the interfaces that are relevant to them.

</aside>

---

<aside>
<img src="https://www.notion.so/icons/book_red.svg" alt="https://www.notion.so/icons/book_red.svg" width="40px" /> **Dependency Inversion Principle (DIP)**
The DIP states that high-level modules should not depend on low-level modules. Instead, both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

TypeScript example:

```tsx
// Bad Example: High-level module directly depends on low-level module
// Logger class - Low-level module
class Logger {
    log(message: string) {
        console.log(`[LOG]: ${message}`);
    }
}

// App class - High-level module
class App {
    private logger: Logger;

    constructor() {
        this.logger = new Logger(); // Dependency directly instantiated here
    }

    doSomething() {
        // ... some business logic
        this.logger.log('Doing something...');
    }
}

const app = new App();
app.doSomething();
```

In this example, the **`App`** class directly depends on the **`Logger`** class, creating a tight coupling between the high-level module (**`App`**) and the low-level module (**`Logger`**).

```tsx
// Good Example: Using abstractions and dependency injection
// Logger interface - Abstraction
interface ILogger {
    log(message: string): void;
}

// Logger class - Low-level module
class Logger implements ILogger {
    log(message: string) {
        console.log(`[LOG]: ${message}`);
    }
}

// App class - High-level module
class App {
    private logger: ILogger; // Dependency is now on the abstraction (interface)

    constructor(logger: ILogger) {
        this.logger = logger; // Dependency is injected through the constructor
    }

    doSomething() {
        // ... some business logic
        this.logger.log('Doing something...');
    }
}

// Now, we can use any logger that implements the ILogger interface, injecting it into the App class.

// Using Logger implementation
const logger = new Logger();
const app = new App(logger);
app.doSomething();

// Using a different Logger implementation
class FileLogger implements ILogger {
    log(message: string) {
        // ... logic to log messages to a file
    }
}

const fileLogger = new FileLogger();
const appWithFileLogger = new App(fileLogger);
appWithFileLogger.doSomething();
```

By using the Dependency Inversion Principle (DIP), we've introduced the **`ILogger`** interface as an abstraction for the logger, and the **`App`** class now depends on the abstraction (**`ILogger`**) rather than the concrete implementation (**`Logger`**). This allows us to easily switch between different logger implementations without modifying the **`App`** class, promoting flexibility and easier testing.

</aside>
