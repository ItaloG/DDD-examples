import CustomerCreatedEvent from "../customer/customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler from "../customer/handler/send-email-when-customer-is-created.handler";
import SendSmsWhenCustomerIsCreatedHandler from "../customer/handler/send-sms-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  describe("ProductCreatedEvent", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(0);
    });

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        name: "Product 1",
        description: "Product 1 description",
        price: 10.0,
      });

      eventDispatcher.notify(productCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  describe("CustomerCreatedEvent", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(0);
    });

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const emailEventHandler = new SendEmailWhenCustomerIsCreatedHandler();
      const smsEventHandler = new SendSmsWhenCustomerIsCreatedHandler();

      eventDispatcher.register("CustomerCreatedEvent", emailEventHandler);
      eventDispatcher.register("CustomerCreatedEvent", smsEventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(emailEventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(smsEventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const emailEventHandler = new SendEmailWhenCustomerIsCreatedHandler();
      const smsEventHandler = new SendSmsWhenCustomerIsCreatedHandler();

      const spyEmailEventHandler = jest.spyOn(emailEventHandler, "handle");
      const spySmsEventHandler = jest.spyOn(smsEventHandler, "handle");

      eventDispatcher.register("CustomerCreatedEvent", emailEventHandler);
      eventDispatcher.register("CustomerCreatedEvent", smsEventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(emailEventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(smsEventHandler);

      const customerCreatedEvent = new CustomerCreatedEvent({
        name: "Customer 1",
      });

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEmailEventHandler).toHaveBeenCalled();
      expect(spySmsEventHandler).toHaveBeenCalled();
    });
  });
});
