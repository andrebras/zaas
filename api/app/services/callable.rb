module Callable
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def call(*args)
      new.call(*args)
    end

    def method_missing(m, *args, &block)
      new.send(m.to_sym, *args)
    end
  end
end
